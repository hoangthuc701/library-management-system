export default function validateInfo(values) {
   let errors = {};

   if (!values.username) {
      console.log(values.username);
      errors.username = "Username is required!";
   }

   if (!values.password) {
      errors.password = "Password is required!";
   } else if (values.password.length < 6) {
      errors.password = "Password at least 6 characters!";
   }

   return errors;
}
