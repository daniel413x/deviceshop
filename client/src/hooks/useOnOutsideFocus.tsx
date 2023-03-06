import { RefObject, useEffect } from 'react';
import useKeyPress from './useKeyPress';

function useOnOutsideFocus<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (...args: any[]) => void,
) {
  const tabPress = useKeyPress('Tab');
  useEffect(() => {
    const target = document.activeElement as HTMLElement;
    if (!ref.current || ref.current.contains(target)) {
      return;
    }
    handler();
  }, [tabPress]);
}

export default useOnOutsideFocus;
