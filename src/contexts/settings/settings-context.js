import React, { useState, useMemo, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const SettingsContext = React.createContext(null);

function SettingsProvider(props) {
  const { children } = props;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [boardSettings, setBoardSettings] = useLocalStorageState(
    'boardSettings',
    {
      labelPosition: 'bottom',
      isLabelHidden: false,
    }
  );

  const context = useMemo(() => {
    function toggleSettings() {
      setIsSettingsOpen((isOpen) => !isOpen);
    }

    function setLabelPosition(labelPosition) {
      setBoardSettings((prevState) => {
        return { ...prevState, labelPosition };
      });
    }

    function setIsLabelHidden(isLabelHidden) {
      setBoardSettings((prevState) => {
        return { ...prevState, isLabelHidden };
      });
    }

    return {
      toggleSettings,
      isSettingsOpen,
      board: {
        setIsLabelHidden,
        setLabelPosition,
        ...boardSettings,
      },
    };
  }, [boardSettings, setBoardSettings, isSettingsOpen]);

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }

  return context;
}

export { SettingsProvider, useSettings };
