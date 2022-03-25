import { useState, useMemo, useEffect } from 'react';
import { boardRepo } from '../../open-board-format/board/board.repo';

export function useBoardNavigation(params = {}) {
  const { navigate, history: initialHistory, index: initialIndex } = params;

  const [rootBoard, setRootBoard] = useState({});
  const [history, setHistory] = useState(initialHistory);
  const [index, setIndex] = useState(initialIndex);

  const navigation = useMemo(() => {
    const isBackDisabled = index <= 0;
    const isForwardDisabled = index >= history.length - 1;

    function goHome() {
      const { id, name } = rootBoard;
      reset({ id, name });
    }

    function goBack() {
      if (isBackDisabled) {
        return;
      }

      setIndex((i) => i - 1);
      navigate?.(-1);
    }

    function goForward() {
      if (isForwardDisabled) {
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
      isBackDisabled,
      isForwardDisabled,
      reset,
      push,
      onBackClick: goBack,
      onForwardClick: goForward,
      onHomeClick: goHome,
    };
  }, [index, history, navigate, rootBoard]);

  useEffect(() => {
    async function getRootBoard() {
      const rootBoard = await boardRepo.getRoot();

      if (rootBoard) {
        setRootBoard(rootBoard);
      }
    }

    getRootBoard();
  }, []);

  return navigation;
}
