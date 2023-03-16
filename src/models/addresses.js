import mongoose from "mongoose";

const addressesSchema = new mongoose.Schema({
   house_number: {
      type: String
   },

   village: {
      type: String,
      required: true
   },

   sub_district: {
      type: String,
      required: true
   },

   district: {
      type: String,
      required: true
   },

   province: {
      type: String,
      required: true
   },

   post_number: {
      type: String,
      maxlength: 5
   }
})

const Addresses = mongoose.model('addresses', addressesSchema)

export default Addresses