import mongoose from "mongoose";

const monkSchema = new mongoose.Schema({
   prefix: {
      type: String,
      required: true,
   },

   first_name: {
      type: String,
      required: true
   },

   last_name: {
      type: String,
      required: true
   },

   jaya: {
      type: String
   },

   birthDate: {
      type: Date
   },

   lineId: {
      type: String,
   },

   tell: {
      type: [String],
      maxlength: 3
   }
});

const Monks = mongoose.model('monks', monkSchema);

export default Monks;