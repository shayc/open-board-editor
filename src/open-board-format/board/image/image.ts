import { nanoid } from 'nanoid';

import * as OBF from '../../interfaces';

export function createImage(props: Partial<OBF.Image> = {}): OBF.Image {
  const { id = nanoid(), ...other } = props;

  const image = {
    id,
    ...other,
  };

  return image;
}
