import { useState } from "react";

const useInput = (defaultValue: any) => {
  const [valueState, setValueState] = useState(defaultValue);

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValueState(value);
  };
  return { valueState, onChange, setValueState };
};

export default useInput;
