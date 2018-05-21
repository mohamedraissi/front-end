const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
info:[{
    ville_id:{
      type: Schema.Types.ObjectId, ref: 'User'
    },
    days:{
      type:Number,
      require: true
    },
    date_debut:{
      type: Date,
      require: true
    },
    date_fin:{
      type: Date,
      require: true
    },
  }
  ],
  booking_id:{type: Schema.Types.ObjectId, ref: 'Booking'}
});
const Info = mongoose.model('info', InfoSchema);

module.exports = Info;