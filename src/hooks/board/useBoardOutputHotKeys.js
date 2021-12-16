import { useHotkeys } from 'react-hotkeys-hook';

export function useBoardOutputHotKeys(params) {
  useHotkeys('del', params.del);
  useHotkeys('backspace', params.backspace);
}
