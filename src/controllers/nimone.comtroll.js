import Users from "../models/users.js";
import Addresses from "../models/addresses.js";
import Nimones from "../models/nimones.js";
import mongoose from "mongoose";


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const createNimone = function(req, res) {
   
   try {
      const { nimone, user, address } = req.body;

      /*
       * FILLTER NULL OF ADDRESS
       */

      if (Object.keys(address).length > 0) {

      /**
       * CREATE ADDRESSES
       */
         const address_doc = new Addresses({
            _id: new mongoose.Types.ObjectId(),
            house_number: address.house_number,
            village: address.village,
            sub_district: address.sub_district,
            district: address.district,
            province: address.province,
            post_number: address.post_number,
         })

         /**
          * CREATE USER DOCUMENT
          */
         const user_doc = new Users({
            _id: new mongoose.Types.ObjectId(),
            first_name: user.first_name,
            last_name: user.last_name,
            tell: [nimone.tell],
            address: address_doc._id
         })

      /**
       * CREATE NIMONE DOCUMENT
       */
          const nimone_doc = new Nimones({
            tell: nimone.tell,
            kinds_of_work: nimone.kinds_of_work,
            location: nimone.location,
            date_time: new Date(),
            amount_monk: nimone.amount_monk,
            notic: nimone.notic? nimone.notic: '',
            user: user_doc._id,
            address: address_doc._id
         })
         
         nimone_doc.save().then(() => {
            user_doc.save();
            address_doc.save()
            res.send('nimone is save successfully')
         }) 
       
      }
      // WHITOUT ADDRESS
      else {
         
         const user_doc = new Users({
            _id: new mongoose.Types.ObjectId(),
            first_name: user.first_name,
            last_name: user.last_name,
            tell: [...nimone.tell]
         })

      /**
       * CREATE NIMONE DOCUMENT
       */

         console.log(user_doc._id, 'rerere')
         const nimone_doc = new Nimones({
            tell: nimone.tell,
            kinds_of_work: nimone.kinds_of_work,
            location: nimone.location,
            date_time: new Date(),
            amount_monk: nimone.amount_monk,
            notic: nimone.notic? nimone.notic: '',
            user: user_doc._id,
         }).save().then(() => {
            user_doc.save()
            res.send('nimone without addres is save successfully')
         })         
      }


   } catch(err) {
      console.log(err)
      res.status(404).json(err);
   }
}

/**
 * RESPONS DATA NIMONE
 * @param {*} req 
 * @param {*} res 
 */
export const getNimone = async function(req, res) {

   try{
      const datas = await Nimones.find()

      if (datas.length === 1){
         res.json(datas[0]);
      }else {
         res.json(datas);
      }
   } 
   catch(err) {
      console.log(err)
      res.status(400).json({
         msg: 'bad request'
      })
   }
}

