import React, { useMemo, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const BoardSettingsContext = React.createContext(null);

function UserSettingsProvider(props) {
  const { children } = props;

  const [boardSettings, setBoardSettings] = useLocalStorageState(
    'boardSettings',
    {
      labelPosition: 'bottom',
      isLabelHidden: false,
    }
  );

  const context = useMemo(() => {
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
      board: {
        setIsLabelHidden,
        setLabelPosition,
        ...boardSettings,
      },
    };
  }, [boardSettings, setBoardSettings]);

  return (
    <BoardSettingsContext.Provider value={context}>
      {children}
    </BoardSettingsContext.Provider>
  );
}

function useUserSettings() {
  const context = useContext(BoardSettingsContext);

  if (!context) {
    throw new Error(
      `useUserSettings must be used within a UserSettingsProvider`
    );
  }

  return context;
}

export { UserSettingsProvider, useUserSettings };
