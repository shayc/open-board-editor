import { useState } from 'react';

export function useNavigation(params) {
  const {
    history,
    navigation: initialNavigation = [],
    index: initialIndex = -1,
    rootState,
  } = params;

  const [navigation, setNavigation] = useState(initialNavigation);
  const [index, setIndex] = useState(initialIndex);
  const activeState = navigation[index];
  const backDisabled = index <= 0;
  const forwardDisabled = index >= navigation.length - 1;

  function goBack() {
    if (backDisabled) {
      return;
    }

    setIndex((i) => i - 1);
    history.goBack();
  }

  function goForward() {
    if (forwardDisabled) {
      return;
    }

    setIndex((i) => i + 1);
    history.goForward();
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
    setNavigation((navigation) => {
      return [...navigation.slice(0, index + 1), state];
    });

    setIndex((i) => i + 1);
    history.push(state.id, state);
  }

  function set(state) {
    setNavigation([state]);
    setIndex(0);
    history.push(state.id, state);
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
}
