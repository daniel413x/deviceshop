import { useState, useEffect, RefObject } from 'react';

const useTrackDimensions: (refOrId?: string | RefObject<any>) => {
  height: number | undefined;
  width: number | undefined;
} = (refOrId) => {
  const [height, setHeight] = useState<number | undefined>(window.innerHeight);
  const [width, setWidth] = useState<number | undefined>(window.innerWidth);
  useEffect(() => {
    const update = () => {
      let returnedHeight;
      let returnedWidth;
      if (refOrId) {
        const isId = typeof refOrId === 'string';
        const isRef = typeof refOrId !== 'string';
        if (isId) {
          const id = refOrId as string;
          const element = document.getElementById(id);
          returnedHeight = element?.clientHeight;
          returnedWidth = element?.clientWidth;
        } else if (isRef) {
          if (!(refOrId as any).current) {
            return;
          }
          const ref = refOrId as any;
          returnedHeight = ref?.current.clientHeight || 0;
          returnedWidth = ref?.current.clientWidth || 0;
        }
      } else {
        returnedHeight = window.innerHeight || 0;
        returnedWidth = window.innerWidth || 0;
      }
      setHeight(returnedHeight);
      setWidth(returnedWidth);
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, [window.innerHeight, window.innerWidth]);
  return { height, width };
};

export default useTrackDimensions;
