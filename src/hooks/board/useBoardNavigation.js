import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { boardRepo } from '../../open-board-format/board/board.repo';

export function useBoardNavigation() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [rootBoardId, setRootBoardId] = useState(null);

  const [history, setHistory] = useState([{ id: boardId }]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getRootBoardId() {
      const rootBoard = await boardRepo.getRoot();

      if (rootBoard) {
        setRootBoardId(rootBoard.id);
      }
    }
    getRootBoardId();
  }, []);

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);

      if (!board) {
        navigate('./');
      }
    }

    getBoard(boardId);
  }, [boardId, navigate]);

  const navigation = useMemo(() => {
    const isBackDisabled = index <= 0;
    const isForwardDisabled = index >= history.length - 1;

    function goHome() {
      if (rootBoardId) {
        const state = { id: rootBoardId };
        reset(state);
      }
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
      activeState: history[index],
    };
  }, [index, history, navigate, rootBoardId]);

  return navigation;
}
