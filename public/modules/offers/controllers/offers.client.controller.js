'use strict';

// Offers controller
angular.module('offers').controller('OffersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Offers',
	function($scope, $stateParams, $location, Authentication, Offers) {
		$scope.authentication = Authentication;

		// Create new Offer
		$scope.create = function() {
			// Create new Offer object
			console.log('here');
			var offer = new Offers ({
				name: this.name,
				description: this.description,
				shortDesc: this.shortDesc,
				image: 'test',
				location: {type:'Point',  coordinates:[22,22]},
				startDate: this.startDate,
				endDate: this.endDate
			});

			// Redirect after save
			offer.$save(function(response) {
				$location.path('offers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Offer
		$scope.remove = function(offer) {
			if ( offer ) { 
				offer.$remove();

				for (var i in $scope.offers) {
					if ($scope.offers [i] === offer) {
						$scope.offers.splice(i, 1);
					}
				}
			} else {
				$scope.offer.$remove(function() {
					$location.path('offers');
				});
			}
		};

		// Update existing Offer
		$scope.update = function() {
			var offer = $scope.offer;

			offer.$update(function() {
				$location.path('offers/' + offer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Offers
		$scope.find = function() {
			$scope.offers = Offers.query();
		};
		
		

		// Find existing Offer
		$scope.findOne = function() {
			$scope.offer = Offers.get({ 
				offerId: $stateParams.offerId
			});
		};
	}
]).directive('appFilereader', function(
    $q
){
    var slice = Array.prototype.slice;

    return {
        restrict: 'A'
        , require: '?ngModel'
        , link: function(scope, element, attrs, ngModel){
            if(!ngModel) return;

            ngModel.$render = function(){}

            element.bind('change', function(e){
                var element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                .then(function(values){
                    if(element.multiple) ngModel.$setViewValue(values);
                    else ngModel.$setViewValue(values.length ? values[0] : null);
                });

                function readFile(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader()
                    reader.onload = function(e){
                        deferred.resolve(e.target.result);
                    }
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    }
                    reader.readAsDataURL(file);

                    return deferred.promise;
                }

            });//change

        }//link

    };//return

})//appFilereader
;