import { useState, useEffect } from "react";

const useTimer = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setValue(initialValue);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setValue((prevValue) => prevValue - 10);
      }, 10);
    } else if (!isActive && value !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, value]);

  return {
    value,
    isActive,
    start,
    pause,
    reset,
  };
};

export default useTimer;
