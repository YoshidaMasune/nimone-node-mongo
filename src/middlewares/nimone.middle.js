import { validationRequest } from "./fillRequest.middle.js";

export const fillWorkRequest = (req, res, next) => {

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
