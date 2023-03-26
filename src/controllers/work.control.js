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
   
   try {
      /*
      * FILLTER NULL OF ADDRESS
      */
     
     if (address != undefined) {
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
               res.status(400).json(err.message)
            })
         }
      }
      // WHITOUT ADDRESS
      else {
         
         const user_doc = new Users({
            _id: new mongoose.Types.ObjectId(),
            first_name: user.first_name,
            last_name: user.last_name,
            tell: [...user.tell]
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
            res.status(400).json(err.message)
         })
      }


   } catch(err) {
      console.log(err);
      res.status(500).json(err)
   }
}

/**
 * RESPONS DATA NIMONE
 * @param {*} req 
 * @param {*} res 
 */
export const getWork = async function(req, res, next) {

   const workId = req.params.workId;
   
   try{

      if (Object.entries(req.query).length > 0) {
         const workFind = await Works.find({...req.query}).populate('user').populate('address');
         
         if (workFind.length === 0) {
            res.send('not found in database');
         }
         else if (workFind.length === 1){
            res.json(workFind[0]);
         }
         else {
            res.json(workFind)
         }
      }
      else if (workId != undefined) {
         const data = await Works.findById(workId).populate('user').populate('address')

         res.json(data)
         
      }else {
         
         const datas = await Works.find().populate('user').populate('address').exec()
         
         if (datas.length === 0){
            res.send('no data in database')
         }
         else {
            res.json(datas);
         }
      }
   } 
   catch(err) {
      console.log(err)
      res.status(400).json(err)
   }
}
