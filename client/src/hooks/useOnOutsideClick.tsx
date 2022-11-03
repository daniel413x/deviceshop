import { RefObject, useEffect } from 'react';

function useOnOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!ref.current || ref.current.contains(target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler],
  );
}

export default useOnOutsideClick;
