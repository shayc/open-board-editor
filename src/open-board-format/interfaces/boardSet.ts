import * as OBF from './obf';

export interface BoardSet {
  manifest: OBF.Manifest;
  boards: {
    [key: string]: OBF.Board;
  };
  files: {
    [key: string]: {
      type: string;
      data: ArrayBuffer;
    };
  };
}
