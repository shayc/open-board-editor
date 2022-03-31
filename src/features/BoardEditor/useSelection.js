import { useMemo } from 'react';
import { useForceUpdate } from '@fluentui/react-hooks';

function useSelection({ items }) {
  const forceUpdate = useForceUpdate();

  const selection = useMemo(() => {
    return new Selection({
      onSelectionChanged: forceUpdate,
      items,
    });
  }, [items, forceUpdate]);

  return selection;
}

export default useSelection;
