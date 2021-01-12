import { useState } from "react";

function useDate(initValue) {
   const [value, setValue] = useState(initValue);

   const resetValue = () => {
      setValue(initValue);
   };

   const handleChange = (date) => {
      setValue(date);
   };

   return [value, handleChange, resetValue];
}

export default useDate;
