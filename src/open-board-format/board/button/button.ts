import { nanoid } from 'nanoid';

import * as OBF from '../../interfaces';

export function createButton(props: Partial<OBF.Button> = {}): OBF.Button {
  const { id = nanoid(), ...other } = props;

  const button = {
    id,
    ...other,
  };

  return button;
}
