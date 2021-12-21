import { useRef } from 'react';

const defaultOptions = {
  clicksThreshold: 2,
  timeBetweenClicks: 400,
};

export function useSafetyOnClick(clickHandler, options = defaultOptions) {
  const clicksCountRef = useRef();
  const timeoutIdRef = useRef();

  function onClick(event) {
    clicksCountRef.current += 1;

    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      clicksCountRef.current = 0;
    }, options.timeBetweenClicks);

    if (clicksCountRef.current >= options.clicksThreshold) {
      clicksCountRef.current = 0;
      clearTimeout(timeoutIdRef.current);

      clickHandler(event);
    }
  }

  return { onClick };
}
