import { SpecialtyActions } from '../board/speciality-actions';

export interface Board {
  id: string;
  name: string;
  buttons: Button[];
  grid: Grid;
  images: Image[];
  sounds: Sound[];
  locale?: string;
  strings?: TranslationStrings;
  format: string;
  url?: string;
  license?: License;
  description_html?: string;
}

export interface BoardDTO {
  id: string;
  name: string;
  buttons: ButtonDTO[];
  grid: GridDTO;
  locale?: string;
  strings?: TranslationStrings;
  format: string;
  url?: string;
  license?: LicenseDTO;
  descriptionHtml?: string;
}

export interface Button {
  id: string;
  label?: string;
  image_id?: string;
  sound_id?: string;
  load_board?: LoadBoard;
  vocalization?: string;
  action?: SpecialtyActions;
  actions?: SpecialtyActions[];
  background_color?: string;
  border_color?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export interface ButtonDTO {
  id: string;
  label?: string;
  image?: ImageDTO | null;
  action?: SpecialtyActions;
  actions?: SpecialtyActions[];
  sound?: SoundDTO | null;
  loadBoard?: LoadBoardDTO;
  backgroundColor?: string;
  borderColor?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  vocalization?: string;
}

export interface LoadBoard {
  id?: string;
  name?: string;
  data_url?: string;
  url?: string;
  path?: string;
}

export interface LoadBoardDTO {
  id?: string;
  name?: string;
  dataUrl?: string;
  url?: string;
  path?: string;
}

export interface Media {
  id: string;
  data?: string;
  path?: string;
  url?: string;
  data_url?: string;
  content_type?: string;
  license?: License;
}

export interface MediaDTO {
  id: string;
  data?: string;
  path?: string;
  url?: string;
  dataUrl?: string;
  contentType?: string;
  license?: LicenseDTO;
}

export interface Image extends Media {
  symbol?: {
    set: string;
    filename: string;
  };
  width?: number;
  height?: number;
}

export interface ImageDTO extends MediaDTO {
  symbol?: {
    set: string;
    filename: string;
  };
  width?: number;
  height?: number;
}

export interface Sound extends Media {
  duration?: number;
}

export interface SoundDTO extends MediaDTO {
  duration?: number;
}

export interface File {
  path: string;
  type: string;
  data: ArrayBuffer;
}

export interface Grid {
  rows: number;
  columns: number;
  order: GridOrder;
}

export interface GridDTO {
  rows: number;
  columns: number;
  order: GridOrder;
}

export type GridOrder = (string | null)[][];

export interface TranslationStrings {
  [key: string]: { [key: string]: string };
}

export interface License {
  type: string;
  copyright_notice_url: string;
  source_url: string;
  author_name: string;
  author_url: string;
  author_email: string;
}

export interface LicenseDTO {
  type: string;
  copyrightNoticeUrl: string;
  sourceUrl: string;
  authorName: string;
  authorUrl: string;
  authorEmail: string;
}

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
