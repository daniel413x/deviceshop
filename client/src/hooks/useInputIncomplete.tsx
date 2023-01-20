import { useState, useEffect } from 'react';

interface UseInputIncompleteProps {
  value?: string;
  pressedSubmit?: boolean;
  setPressedSubmit?: (boolean: boolean) => void;
  condition?: boolean;
}

interface UseInputIncompleteReturn {
  warn: boolean;
  removeWarning: () => void;
}

const useInputIncomplete = ({
  value,
  setPressedSubmit,
  pressedSubmit,
  condition,
}: UseInputIncompleteProps): UseInputIncompleteReturn => {
  const [warn, setWarn] = useState<boolean>(false);
  const removeWarning = () => {
    if (warn && setPressedSubmit) {
      setWarn(false);
      setPressedSubmit(false);
    }
  };
  useEffect(() => {
    if (setPressedSubmit && pressedSubmit) {
      if (condition) {
        setWarn(true);
        setPressedSubmit(false);
      } else if (!value) {
        setWarn(true);
        setPressedSubmit(false);
      }
    }
  }, [pressedSubmit]);
  useEffect(() => {
    removeWarning();
  }, [value]);
  return {
    warn,
    removeWarning,
  };
};

export default useInputIncomplete;
