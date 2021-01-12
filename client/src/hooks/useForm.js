const { useState, useEffect, useCallback } = require("react");

const useForm = (validate, callback, initValues) => {
   const [values, setValues] = useState(initValues);

   const [errors, setErrors] = useState({});

   const [isSubmitting, setIsSubmitting] = useState(false);

   const handelCancelForm = () => {
      setValues(initValues);
   };

   const handleSelectedChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors(validate(values));
      setIsSubmitting(true);
   };

   useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
         callback(values);
      }
   }, [errors]);

   return { handleChange, values, handleSubmit, errors, handelCancelForm };
};

export default useForm;
