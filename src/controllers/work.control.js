import Users from "../models/users.js";
import Addresses from "../models/addresses.js";
import Works from "../models/works.js";
import mongoose from "mongoose";


/**
 * @param {*} req 
 * @param {*} res 
 */
export const createNimone = function(req, res) {
   
   try {
      const { work, user, address } = req.body;

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
            tell: [work.tell],
            address: address_doc._id
         })

         /**
          * CREATE NIMONE DOCUMENT
          */
          const work_doc = new Works({
            tell: work.tell,
            kinds_of_work: work.kinds_of_work,
            location: work.location,
            date_time: new Date(),
            amount_monk: work.amount_monk,
            notic: work.notic? work.notic: '',
            user: user_doc._id,
            address: address_doc._id
         })

         work_doc.save().then(() => {
            user_doc.save();
            address_doc.save();

            res.status(200).send('save data successfully')
         }).catch(err => {
            console.log(err);
            res.status(400).send(err.message)
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

         const work_doc = new Works({
            tell: work.tell,
            kinds_of_work: work.kinds_of_work,
            location: work.location,
            date_time: new Date(),
            amount_monk: work.amount_monk,
            notic: work.notic? work.notic: '',
            user: user_doc._id,
         })     
         
         work_doc.save().then(() => {
            user_doc.save();

            res.status(200).send('save data successfully')
         }).catch(err => {

            console.log(err);
            res.status(400).send(err.message)
         })
      }


   } catch(err) {
      console.log(err);
      res.status(500).send(err)
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
      console.log('error')
      res.status(400).json({
         msg: 'bad request'
      })
   }
}

