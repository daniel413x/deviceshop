import { RefObject, useEffect } from 'react';

function useOnInsideClick<T extends HTMLElement>(
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
        if (!ref.current) {
          return;
        }
        const target = event.target as HTMLElement;
        if (ref.current.contains(target)) {
          if (options?.excludeClasses) {
            const { excludeClasses } = options;
            for (let string = 0; string < excludeClasses.length; string += 1) {
              if (target.classList.contains(excludeClasses[string])) {
                return;
              }
            }
          }
          if (options?.lookForClasses) {
            const { lookForClasses } = options;
            for (let string = 0; string < lookForClasses.length; string += 1) {
              if (target.classList.contains(lookForClasses[string])) {
                handler(event);
                return;
              }
            }
          }
          handler(event);
        }
      };
      document.addEventListener('mouseup', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mouseup', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler],
  );
}

export default useOnInsideClick;
