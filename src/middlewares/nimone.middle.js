
export const fillNimoneRequest = (req, res, next) => {

   const { nimone, user, address } = req.body;
   const feildUserArray = ['first_name', 'last_name', 'tell'];
   const feildNimoneArray = ['kinds_of_work', 'location', 'date_time', 'amount_monk', 'tell']

   const countUser = Object.entries(user).length;
   const countNimone = Object.entries(nimone).length;
   const countAddress = Object.entries(address).length

   try {

      /* if user_req and nimone are not have properties => 
      *  res.status(400) to req 
      */
      if (countUser === 0 && countNimone === 0) {
         
         // respons
         res.status(400).json({
            msg: 'not found user and nimone datas'
         })
      }

     
      else if (countNimone > 0 && countUser > 0) {

         const msgNimoneError = feildNimoneArray.filter(prop => !nimone.hasOwnProperty(prop));
         const msgUserError = feildUserArray.filter(prop => !user.hasOwnProperty(prop));

         // respons

         if (msgNimoneError.length > 0 || msgUserError.length > 0) {
            res.status(400).json({
               msg: `not found user and not found `,
               mistake: {
                  nimone: msgNimoneError,
                  user: msgUserError
               }
            })
         }
         else {
            next()
         }
      }


      else if (countUser < 3){
         
         const msgError = feildUserArray.filter(prop => user.hasOwnProperty(prop))
         
         // respons
         res.status(400).json({
            msg: `not found ${msgError.toString()} data`,
            mistake: msgError
         })

      }

      else {

         if (countUser === 3) {
      
            const reqUserState = fillRequest(user, feildUserArray)

            if (typeof reqUserState === 'object') {

               // respons
               res.status(reqUserState.status)
               .json({
                  msg: reqUserState.msg,
                  mistake: reqUserState.feild_mistake
               })
            }else {

               next();
            }
         }
      }

   } catch (error) {
      console.log(error)
      res.status(500).json(error.error)
   }
}



/**
 * @param {*} requestObj 
 * @param {*} fill 
 * @returns true | obj
 */

const fillRequest = (requestObj, fill=[]) => {
   const fills = [...fill];
   const msgErr = {
      feild_mistake: [],
      msg: '',
      status: 200
   };

   // LOGIG
   const fillResultArray = fills.filter(prop => Boolean(requestObj[prop] === 'false' || requestObj[prop] === ''))

   if (fillResultArray.length > 0) {
      msgErr.status = 400;
      msgErr.feild_mistake = fillResultArray;
      msgErr.msg = `not found ${fillResultArray}`

      return msgErr;
   }else {
      return true
   }
}