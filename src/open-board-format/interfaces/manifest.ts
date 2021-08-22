export interface Manifest {
  format: string;
  root: string;
  paths: {
    boards: {
      [key: string]: string;
    };
    images?: {
      [key: string]: string;
    };
    sounds?: {
      [key: string]: string;
    };
  };
  [key: string]: any;
}
