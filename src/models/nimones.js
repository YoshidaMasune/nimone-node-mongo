import mongoose from "mongoose";

const nimoneSchema = new mongoose.Schema({
   work: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'works',
      required: true
   },

   monks: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'monks'
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