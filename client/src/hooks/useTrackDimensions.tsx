import { useState, useEffect, RefObject } from 'react';

const useTrackDimensions: (refOrId?: string | RefObject<any>) => {
  height: number | undefined;
  width: number | undefined;
} = (refOrId) => {
  const [height, setHeight] = useState<number | undefined>(0);
  const [width, setWidth] = useState<number | undefined>(0);
  useEffect(() => {
    const update = () => {
      let clientHeight;
      let clientWidth;
      if (typeof refOrId === 'string') {
        const id = refOrId as string;
        const element = document.getElementById(id);
        clientHeight = element?.clientHeight;
        clientWidth = element?.clientWidth;
      } else if (refOrId) {
        const ref = refOrId as RefObject<any>;
        clientHeight = ref?.current.clientHeight || 0;
        clientWidth = ref?.current.clientWidth || 0;
      } else {
        clientHeight = window.innerHeight || 0;
        clientWidth = window.innerWidth || 0;
      }
      setHeight(clientHeight);
      setWidth(clientWidth);
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, [window.innerHeight, window.innerWidth]);
  return { height, width };
};

export default useTrackDimensions;
