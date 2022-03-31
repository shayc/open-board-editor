import { useHotkeys } from 'react-hotkeys-hook';

export function useBoardEditorHotKeys({ del }) {
  useHotkeys('del', del, [del]);
}
