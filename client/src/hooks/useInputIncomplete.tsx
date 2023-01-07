import { useState, useEffect } from 'react';

interface UseInputIncompleteProps {
  input?: string;
  pressedSubmit?: boolean;
  setPressedSubmit?: (boolean: boolean) => void;
  condition?: boolean;
}

interface UseInputIncompleteReturn {
  warn: boolean;
  removeWarning: () => void;
}

const useInputIncomplete = ({
  input,
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
      } else if (!input || input === '') {
        setWarn(true);
        setPressedSubmit(false);
      }
    }
  }, [pressedSubmit]);
  useEffect(() => {
    removeWarning();
  }, [input]);
  return {
    warn,
    removeWarning,
  };
};

export default useInputIncomplete;
