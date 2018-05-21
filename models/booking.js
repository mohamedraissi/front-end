const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  date_debut:{
    type: Date,
    require: true
  },
  date_fin:{
    type: Date,
    require: true
  },
  
  days:{
    type:Number,
    require: true
  },

  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  marker_id: [{ type: Schema.Types.ObjectId, ref: 'Marker' }]
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
