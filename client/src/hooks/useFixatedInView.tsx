import { useState, useEffect, RefObject } from 'react';
import { useInView } from 'framer-motion';

interface UseFixatedInViewProps {
  ref: RefObject<any>;
  func?: () => void;
  timeout?: number;
  id?: string;
}

function useFixatedInView({
  ref,
  func,
  timeout = 350,
}: UseFixatedInViewProps) {
  const [fixated, setFixated] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView && !fixated) {
      setTimeout(() => {
        if (inView) {
          setFixated(true);
          if (func) {
            (async () => {
              try {
                await func();
              } finally {
                setLoaded(true);
              }
            })();
          }
        }
      }, timeout);
    }
  }, [inView]);
  return { fixated, loaded };
}

export default useFixatedInView;
