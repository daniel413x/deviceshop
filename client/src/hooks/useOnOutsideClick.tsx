import { RefObject, useEffect } from 'react';

function useOnOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  options?: {
    lookForClasses?: string[],
    excludeClasses?: string[],
  },
) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!ref.current || ref.current.contains(target)) {
          if (options?.lookForClasses) {
            const { lookForClasses } = options;
            for (let string = 0; string < lookForClasses.length; string += 1) {
              if (target.classList.contains(lookForClasses[string])) {
                handler(event);
                return;
              }
            }
          }
          if (options?.excludeClasses) {
            const { excludeClasses } = options;
            for (let string = 0; string < excludeClasses.length; string += 1) {
              if (target.classList.contains(excludeClasses[string])) {
                return;
              }
            }
          }
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
