/**
 * 
 * @param {*} request 
 * @param {*} arrFill 
 * @returns 
 */

export const validationRequest = (request, arrFill=[]) => {
   const lenRequest = Object.entries(request).length;

   const msgObj = {
      status: 200,
      errormsg: '',
      msg: '',
      feild_mistake: [],
      success: true
   }
   
   const fillEmptyFeild = arrFill.filter( prop => !request.hasOwnProperty(prop));
   const fillEmptyValues = arrFill.filter( prop => Boolean(request[prop]) == 'false' || request[prop] == '');

   if (fillEmptyFeild.length == 0) {

      if (fillEmptyValues.length > 0) {
         msgObj.status = 400;
         msgObj.errormsg = `${fillEmptyValues.toString()} is empty string`;
         msgObj.msg = 'bad request';
         msgObj.feild_mistake = [...fillEmptyValues];
         msgObj.success = false;
      }
   }
   else if (fillEmptyFeild.length > 0) {
      msgObj.status = 400;
      msgObj.errormsg = `${fillEmptyValues.toString()} is not found`;
      msgObj.msg = 'bad request';
      msgObj.feild_mistake = [...fillEmptyFeild];
      msgObj.success = false;
   
   }

   return msgObj;
}