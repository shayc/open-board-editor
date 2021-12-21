import { useHotkeys } from 'react-hotkeys-hook';

export function useBoardOutputHotKeys(params) {
  const { del, backspace } = params;

  useHotkeys('del', del);
  useHotkeys('backspace', backspace);
}
