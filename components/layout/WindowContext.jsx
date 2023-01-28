import React, { useCallback, useEffect, useState } from 'react';

export const WindowContext = React.createContext({ clientHeight: 0, clientWidth: 0 });

export const WindowContextProvider = ({ children }) => {
  const getVh = useCallback(() => {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  }, []);

  const getVw = useCallback(() => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  }, []);

  const [clientHeight, setVh] = useState(1080);
  const [clientWidth, setVw] = useState(1920);

  useEffect(() => {
    setVh(getVh());
    setVw(getVw());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVh(getVh());
      setVw(getVw());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getVh, getVw]);

  return <WindowContext.Provider value={{ clientHeight, clientWidth }}>{children}</WindowContext.Provider>;
};
