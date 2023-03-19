import Users from "../models/users.js";
import Addresses from "../models/addresses.js";
import Works from "../models/works.js";
import mongoose from "mongoose";

import { validationRequest } from "../middlewares/fillRequest.middle.js";

/**
 * @param {*} req 
 * @param {*} res 
 */
export const createWork = function(req, res) {

   const { work, user, address } = req.body;

   const feildAddressArray = ['village', 'district', 'sub_district', 'province',];
   const fillAddress = validationRequest(address, feildAddressArray)

   try {
      /*
      * FILLTER NULL OF ADDRESS
      */
     
     if (Object.keys(address).length > 0) {
         const fillAddress = validationRequest(address, feildAddressArray)

         if (!fillAddress.success) {
            res.status(fillAddress.status).json(fillAddress)
         }else {

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
export const getWork = async function(req, res, next) {

   try{
      const datas = await Works.find().populate('user').populate('address').exec()

      if (datas.length === 1){
         res.json(datas[0]);
      }
      else if (datas.length === 0){
         res.send('no data in database')
      }
      else {
         res.json(datas);
      }
   } 
   catch(err) {
      console.log(err)
      res.status(400).json(err)
   }
}

