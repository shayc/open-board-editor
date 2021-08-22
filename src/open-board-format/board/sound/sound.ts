import { nanoid } from 'nanoid';

import * as OBF from '../../interfaces';

export function createSound(props: Partial<OBF.Sound> = {}): OBF.Sound {
  const { id = nanoid(), ...other } = props;

  const sound = {
    id,
    ...other,
  };

  return sound;
}
