export default function validateInfo(values) {
   let errors = {};

   if (!values.email) {
      errors.email = "Email is required!";
   }

   if (!values.username) {
      console.log(values.username);
      errors.username = "Username is required!";
   }

   if (!values.password) {
      errors.password = "Password is required!";
   } else if (values.password.length < 6) {
      errors.password = "Password at least 6 characters!";
   }

   if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required!";
   } else if (values.confirmpassword.length < 6) {
      errors.confirmpassword = "Confirm Password at least 6 characters!";
   } else if (values.password != values.confirmpassword) {
      errors.confirmpassword = "Password do not match!";
   }

   return errors;
}
