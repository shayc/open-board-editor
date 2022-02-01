import { useState, useMemo } from 'react';

export function useBoardNavigation(params = {}) {
  const { navigate } = params;

  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(-1);

  const navigation = useMemo(() => {
    const backDisabled = index <= 0;
    const forwardDisabled = index >= history.length - 1;

    function goBack() {
      if (backDisabled) {
        return;
      }

      setIndex((i) => i - 1);
      navigate?.(-1);
    }

    function goForward() {
      if (forwardDisabled) {
        return;
      }

      setIndex((i) => i + 1);
      navigate?.(1);
    }

    function push(state) {
      if (!state?.id) {
        return;
      }

      setHistory((history) => {
        return [...history.slice(0, index + 1), state];
      });

      setIndex((i) => i + 1);
      navigate?.(state.id);
    }

    function reset(state) {
      if (!state?.id) {
        return;
      }

      setHistory([state]);
      setIndex(0);
      navigate?.(state.id);
    }

    return {
      backDisabled,
      forwardDisabled,
      goBack,
      goForward,
      reset,
      push,
    };
  }, [index, history, navigate]);

  return navigation;
}
