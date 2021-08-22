import { useEffect, useState } from 'react';

function useDelayedRender(delay) {
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayed(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return (fn) => !delayed && fn();
}

export default useDelayedRender;
