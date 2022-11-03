import { useState, useEffect } from 'react';

interface UseBreakpointsReturn {
  'xs': boolean,
  'sm': boolean,
  'md': boolean,
  'lg': boolean,
  'xl': boolean,
  'xxl': boolean,
}

const useBreakpoints = (): UseBreakpointsReturn => {
  const [xs, setXs] = useState<boolean>(false);
  const [sm, setSm] = useState<boolean>(false);
  const [md, setMd] = useState<boolean>(false);
  const [lg, setLg] = useState<boolean>(false);
  const [xl, setXl] = useState<boolean>(false);
  const [xxl, setXxl] = useState<boolean>(false);
  useEffect(() => {
    const updateSize = () => {
      const { innerWidth: width } = window;
      setXs(false);
      setSm(false);
      setMd(false);
      setLg(false);
      setXl(false);
      setXxl(false);
      if (width < 576) {
        setXs(true);
      }
      if (width >= 576) {
        setSm(true);
      }
      if (width >= 768) {
        setMd(true);
      }
      if (width >= 992) {
        setLg(true);
      }
      if (width >= 1200) {
        setXl(true);
      }
      if (width >= 1400) {
        setXxl(true);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [window.innerWidth, window.innerHeight]);
  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

export default useBreakpoints;
