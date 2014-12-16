'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Offer Schema
 */
var OfferSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Offer name',
		trim: true
	},
	description:
	{
		type:String,
		default:'',
		required:'Please fill offer description',
		trim: true
	},
	shortDesc:
	{
		type:String,
		default:'',
		trim: true
	},
	image:
	{
		type:String,
		default:'',
		required:'Please upload image'
	},
	location: {
    'type': {
      type: String,
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
	created: {
		type: Date,
		default: Date.now
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
OfferSchema.index({location: '2dsphere'});
mongoose.model('Offer', OfferSchema);
