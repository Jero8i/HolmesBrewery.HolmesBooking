import { useState } from "react";

export function useLogin() {
  const [activeOption, setActiveOption] = useState(0);

  const chooseOption = (n: number) => {
    setActiveOption(n);
  }
  
  const goBack = () => {
    setActiveOption(0);
  };

  return {
    activeOption,
    chooseOption,
    goBack
  }
}
