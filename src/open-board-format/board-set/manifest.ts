import * as OBF from '../interfaces';

export function createManifest(): OBF.Manifest {
  const manifest = {
    root: '',
    format: 'open-board-0.1',
    paths: {
      boards: {},
      images: {},
      sounds: {},
    },
  };

  return manifest;
}
