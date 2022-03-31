import { useHotkeys } from 'react-hotkeys-hook';

export function useBoardEditorHotKeys({ onDelete }) {
  useHotkeys('del', onDelete, [onDelete]);
}
