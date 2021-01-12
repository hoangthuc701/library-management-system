import { useRef, useEffect, useState } from "react";

function useAmount(initValue) {
   const inputRef = useRef();
   const [value, setValue] = useState(initValue || 1);

   useEffect(() => {
      resize(inputRef.current);
   }, [value]);

   const resetValue = () => {
      setValue(initValue);
   };

   const handleChange = (e) => {
      if (e.target.value <= 0) {
         setValue(1);
      } else {
         setValue(parseInt(e.target.value));
      }
   };

   const plus = () => {
      setValue(parseInt(value) + 1);
   };

   const minus = () => {
      if (parseInt(value) > 1) {
         setValue(value - 1);
      }
   };
   function resize(el) {
      let width = (el.value.length + 1) * 8;
      el.style.width = width + "px";
   }

   return [value, handleChange, plus, minus, resetValue, inputRef];
}

export default useAmount;
