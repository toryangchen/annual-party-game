import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Poi = new Schema({
	name: {
		type: String,
	},
	province: {
		type: String,
	},
	city: {
		type: String,
	},
	country: {
		type: Number,
	},
	areaCode: {
		type: String,
	},
	tel: {
		type: String,
	},
	area: {
		type: String,
	},
	addr: {
		type: String,
	},
	type: {
		type: String,
	},
	module: {
		type: String,
	},
	longitude: {
		type: Number,
	},
	latitude: {
		type: Number,
	}
});

export default mongoose.model('Poi', Poi)