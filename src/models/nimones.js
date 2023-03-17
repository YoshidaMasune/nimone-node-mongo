import mongoose from "mongoose";

/* model for nimone 
      relation () => ['Addresses', 'Users']
*/
const nimonesSchema = new mongoose.Schema({
   kinds_of_work: {
      type: String,
      required: true,
      maxlength: 100 
   },

   location: {
      type: String,
      required: true,
   },

   date_time: {
      type: Date,
      default: Date.now(),
   },

   amount_monk: {
      type: Number,
      required: true,
      maxlength: 20,
      minlength: 1
   },

   tell: {
      type: String,
      required: true,
      maxlength: 11
   },

   notic: {
      type: String,
      required: false
   },

   address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'addresses',
   },

   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
   }, 

   state: {
      type: mongoose.Schema.Types.Mixed,
      default: {
         success: false,
         unsuccess: true,
         mistake: false
      }
   }
})

const Nimones =  mongoose.model('nimones', nimonesSchema);
export default Nimones;