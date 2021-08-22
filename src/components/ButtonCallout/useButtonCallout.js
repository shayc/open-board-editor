import { useState } from 'react';

const emptyButton = { label: '' };

function useButtonCallout(params = {}) {
  const {
    button: initialButton = emptyButton,
    position: initialPosition,
    target: initialTarget,
  } = params;

  const [button, setButton] = useState(initialButton);
  const [buttonPosition, setButtonPosition] = useState(initialPosition);
  const [calloutTarget, setCalloutTarget] = useState(initialTarget);

  function resetButton() {
    setButton(emptyButton);
    setButtonPosition(null);
    setCalloutTarget(null);
  }

  return {
    button,
    buttonPosition,
    calloutTarget,
    resetButton,
    setButton,
    setButtonPosition,
    setCalloutTarget,
  };
}

export default useButtonCallout;
