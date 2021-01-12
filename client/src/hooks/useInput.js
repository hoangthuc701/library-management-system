import { useState } from "react";

function useInput(initValue) {
   const [value, setValue] = useState(initValue || "");

   const resetValue = () => {
      setValue(initValue);
   };

   const handleChange = (e) => {
      setValue(e.target.value);
   };

   return [value, handleChange, resetValue];
}

export default useInput;
