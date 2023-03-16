import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
   first_name: {
      type: String,
      required: true,
   }, 

   last_name: {
      type: String,
      required: true,
   },

   tell: {
      type: [String],
      required: true,
      minlength: 1,
   }, 

   address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'addresses',
   }
})

const Users = mongoose.model('users', usersSchema)
export default Users