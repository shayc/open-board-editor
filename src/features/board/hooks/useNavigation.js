import { useState, useMemo } from 'react';

export function useNavigation(params) {
  const {
    navigate,
    navigation: initialNav = [],
    index: initialIndex = -1,
    rootState,
  } = params;

  const [nav, setNav] = useState(initialNav);
  const [index, setIndex] = useState(initialIndex);

  const navigation = useMemo(() => {
    const activeState = nav[index];
    const backDisabled = index <= 0;
    const forwardDisabled = index >= nav.length - 1;

    function goBack() {
      if (backDisabled) {
        return;
      }

      setIndex((i) => i - 1);
      navigate(-1);
    }

    function goForward() {
      if (forwardDisabled) {
        return;
      }

      setIndex((i) => i + 1);
      navigate(1);
    }

    function goTo(id) {
      push({ id });
    }

    function goToRoot() {
      if (!rootState?.id) {
        return;
      }

      set({ id: rootState.id });
    }

    function push(state) {
      setNav((nav) => {
        return [...nav.slice(0, index + 1), state];
      });

      setIndex((i) => i + 1);
      navigate(state.id, { state });
    }

    function set(state) {
      setNav([state]);
      setIndex(0);
      navigate(state.id, { state });
    }

    return {
      backDisabled,
      forwardDisabled,
      goBack,
      goForward,
      goTo,
      goToRoot,
      activeState,
    };
  }, [navigate, index, nav, rootState.id]);

  return navigation;
}
