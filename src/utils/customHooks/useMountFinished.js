import { useRef, useEffect } from 'react';

const useMountFinished = () => {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
};

export default useMountFinished