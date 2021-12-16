import { useState, useMemo } from 'react';

const defaultHistory = [];
const defaultIndex = -1;

export function useBoardNavigation(params = {}) {
  const {
    history: initialHistory = defaultHistory,
    index: initialIndex = defaultIndex,
  } = params;

  const [history, setHistory] = useState(initialHistory);
  const [index, setIndex] = useState(initialIndex);

  const navigation = useMemo(() => {
    const activeState = history[index];
    const backDisabled = index <= 0;
    const forwardDisabled = index >= history.length - 1;

    function goBack() {
      if (backDisabled) {
        return;
      }

      setIndex((i) => i - 1);
    }

    function goForward() {
      if (forwardDisabled) {
        return;
      }

      setIndex((i) => i + 1);
    }

    function reset(state) {
      setHistory(state ? [state] : defaultHistory);
      setIndex(state ? 0 : defaultIndex);
    }

    function push(state) {
      setHistory((history) => {
        return [...history.slice(0, index + 1), state];
      });

      setIndex((i) => i + 1);
    }

    return {
      activeState,
      backDisabled,
      forwardDisabled,
      goBack,
      goForward,
      push,
      reset,
    };
  }, [index, history]);

  return navigation;
}
