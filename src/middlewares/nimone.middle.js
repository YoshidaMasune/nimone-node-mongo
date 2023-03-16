
export const fillNimoneRequest = (req, res, next) => {

   const { nimone, user, address } = req.body;

   try {

      if (Object.keys(user).length === 0 && Object.keys(nimone).length === 0) {
         res.status(400).json({
            msg: 'not found user and nimone datas'
         })
      }

      /**
       * 
       */
      else if (Object.keys(user) === 0) {
         
         res.status(400).json({
            msg: 'not found user data'
         })
      }

      /**
       * 
       */
      else if ( Object.keys(user).length === 0){

         res.status(400).json({
            msg: 'not found user data'
         })
      }

      /**
       * 
       */
      else if (Object.keys(nimone).length < 3) {
         
         if (!user.hasOwnProperty('first_name') && !user.hasOwnProperty('last_name') && !user.hasOwnProperty('tell')) {

            res.status(400).json({
               status: 400,
               msg: 'not found first_name, last_name, tell, at body'
            })
         }

         /**
          * 
          */
         else if (user.hasOwnProperty('first_name') && user.hasOwnProperty('last_name')) {

            res.status(400).json({
               status: 400,
               msg: 'not found tell, at body'
            })
         }
      }

      /**
       * 
       */
      else {
         next();
      }

   } catch (error) {
      console.log(err);
      res.status(500).json(err)
   }
}