import { useState } from "react";

function useSelect(initValue) {
   const [value, setValue] = useState(initValue);

   const resetValue = () => {
      setValue(initValue);
   };

   const handleChange = (selectedOption) => {
      setValue(selectedOption);
   };

   return [value, handleChange, resetValue];
}

export default useSelect;
