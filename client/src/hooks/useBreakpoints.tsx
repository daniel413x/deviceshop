import { useState, useEffect } from 'react';

interface UseBreakpointsReturn {
  width: number,
  'xs': boolean,
  'sm': boolean,
  'md': boolean,
  'lg': boolean,
  'xl': boolean,
  'xxl': boolean,
}

const useBreakpoints = (): UseBreakpointsReturn => {
  const [width, setWidth] = useState<number>(0);
  const [xs, setXs] = useState<boolean>(false);
  const [sm, setSm] = useState<boolean>(false);
  const [md, setMd] = useState<boolean>(false);
  const [lg, setLg] = useState<boolean>(false);
  const [xl, setXl] = useState<boolean>(false);
  const [xxl, setXxl] = useState<boolean>(false);
  useEffect(() => {
    const updateSize = () => {
      const { innerWidth } = window;
      setWidth(innerWidth);
      setXs(false);
      setSm(false);
      setMd(false);
      setLg(false);
      setXl(false);
      setXxl(false);
      if (innerWidth < 576) {
        setXs(true);
      }
      if (innerWidth >= 576) {
        setSm(true);
      }
      if (innerWidth >= 768) {
        setMd(true);
      }
      if (innerWidth >= 991) {
        setLg(true);
      }
      if (innerWidth >= 1200) {
        setXl(true);
      }
      if (innerWidth >= 1400) {
        setXxl(true);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [window.innerWidth, window.innerHeight]);
  return {
    width,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

export default useBreakpoints;
