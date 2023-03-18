import { validationRequest } from "./fillRequest.middle.js";

export const fillNimoneRequest = (req, res, next) => {

   const { work, user, address } = req.body;
   const feildUserArray = ['first_name', 'last_name', 'tell'];
   const feildWorkArray = ['kinds_of_work', 'location', 'amount_monk', 'tell']

   const workfill = validationRequest(work, feildWorkArray);
   const userfill = validationRequest(user, feildUserArray);

   try {

      if (!workfill.success || !userfill.success) {
         res.status(400).json({
            work: workfill,
            user: userfill
         });
      }
      else if (!workfill.success) {
         res.status(workfill.status).json(workfill);
      }
      else if (!userfill.success) {
         res.status(userfill.status).json(userfill);
      }
      else {
         next();
      }

   } catch (error) {
      console.log(error)
      res.status(500).json(error.error)
   }
}


// const validationRequest = (request, arrFill=[]) => {
//    const lenRequest = Object.entries(request).length;

//    const msgObj = {
//       status: 200,
//       errormsg: '',
//       msg: '',
//       feild_mistake: [],
//       success: true
//    }
   
//    const fillEmptyFeild = arrFill.filter( prop => !request.hasOwnProperty(prop));
//    const fillEmptyValues = arrFill.filter( prop => Boolean(request[prop]) == 'false' || request[prop] == '');

//    if (fillEmptyFeild.length == 0) {

//       if (fillEmptyValues.length > 0) {
//          msgObj.status = 400;
//          msgObj.errormsg = `${fillEmptyValues.toString()} is empty string`;
//          msgObj.msg = 'bad request';
//          msgObj.feild_mistake = [...fillEmptyValues];
//          msgObj.success = false;
//       }
//    }
//    else if (fillEmptyFeild.length > 0) {
//       msgObj.status = 400;
//       msgObj.errormsg = `${fillEmptyValues.toString()} is not found`;
//       msgObj.msg = 'bad request';
//       msgObj.feild_mistake = [...fillEmptyFeild];
//       msgObj.success = false;
   
//    }

//    return msgObj;
// }  