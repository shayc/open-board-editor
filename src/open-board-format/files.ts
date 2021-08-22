import JSZip from 'jszip';
import mime from 'mime/lite';
import { saveAs } from 'file-saver';

import * as OBF from './interfaces';
import { createBoardSet } from './board-set/boardSet';

export async function readFiles(files: FileList): Promise<OBF.BoardSet[]> {
  const promises: Promise<OBF.BoardSet>[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const type = getFileType(file.name);

    if (type.isOBF) {
      const obf = await readOBFFile(file);
      const board = parseOBF(obf);
      const boardSet = createBoardSet(board, file.name);

      promises.push(Promise.resolve(boardSet));
    }

    if (type.isOBZ) {
      const obz = await readOBZFile(file);
      const boardSet = parseOBZ(obz);

      promises.push(boardSet);
    }
  }

  return Promise.all(promises);
}

export async function saveAsOBZFile(
  boardSet: OBF.BoardSet,
  filename: string = 'board-set',
  onUpdate?: (metadata: { percent: number; currentFile: string }) => void
) {
  const blob = await zipBoardSet(boardSet, { type: 'blob' }, onUpdate);
  saveAs(blob, `${filename}.obz`);
}

function readOBFFile(file: File): Promise<string> {
  return file.text();
}

function readOBZFile(file: File): Promise<JSZip> {
  return JSZip.loadAsync(file);
}

function parseOBF(text: string): OBF.Board {
  const board = JSON.parse(text);
  return stringifyBoardIds(board);
}

function parseOBZ(zip: JSZip): Promise<OBF.BoardSet> {
  const startTime = performance.now();

  return new Promise((resolve, reject) => {
    const boardSet = createBoardSet();

    let counter = 0;

    zip.forEach(async (relativePath, file) => {
      counter++;

      const type = getFileType(file.name);

      if (type.isImage || type.isAudio) {
        const data = await file.async('arraybuffer');
        boardSet.files[relativePath] = { type: type.mediatype, data };
      }

      if (type.isOBF) {
        const obf = await file.async('text');
        boardSet.boards[relativePath] = parseOBF(obf);
      }

      if (type.isManifest) {
        const manifest = await file.async('text');
        boardSet.manifest = JSON.parse(manifest);
      }

      if (!--counter) {
        const endTime = performance.now();
        console.log('parseOBZ :>> ', endTime - startTime);

        resolve(boardSet);
      }
    });
  });
}

function getFileType(filename: string): {
  isAudio: boolean;
  isImage: boolean;
  isManifest: boolean;
  isOBF: boolean;
  isOBZ: boolean;
  mediatype: string;
} {
  const mediatype = mime.getType(filename) || '';

  const isAudio = /audio/.test(mediatype);
  const isImage = /image/.test(mediatype);
  const isManifest = /manifest\.json/.test(filename);
  const isOBF = /\.obf/.test(filename);
  const isOBZ = /\.obz/.test(filename);

  const type = {
    mediatype,
    isAudio,
    isImage,
    isManifest,
    isOBF,
    isOBZ,
  };

  return type;
}

function stringifyBoardIds(board: OBF.Board): OBF.Board {
  board.id = board.id.toString();

  if (board.grid) {
    board.grid.order = board.grid.order.map((row) =>
      row.map((id) => id?.toString() ?? null)
    );
  }

  board.buttons = board.buttons.map((button: OBF.Button) => ({
    ...button,
    id: button.id.toString(),
    ...(button.sound_id && { sound_id: button.sound_id?.toString() }),
    ...(button.image_id && { image_id: button.image_id?.toString() }),
  }));

  board.sounds = board?.sounds.map((sound: OBF.Sound) => ({
    ...sound,
    id: sound.id.toString(),
  }));

  board.images = board?.images.map((image: OBF.Image) => ({
    ...image,
    id: image.id.toString(),
  }));

  return board;
}

function zipBoardSet<T extends JSZip.OutputType>(
  boardSet: OBF.BoardSet,
  options?: JSZip.JSZipGeneratorOptions<T>,
  onUpdate?: (metadata: { percent: number; currentFile: string }) => void
) {
  const { manifest, boards, files } = boardSet;
  const zip = new JSZip();

  zip.file('manifest.json', JSON.stringify(manifest));

  Object.keys(boards).forEach((path) => {
    zip.file(path, JSON.stringify(boards[path]));
  });

  Object.keys(files).forEach((path) => {
    zip.file(path, files[path].data);
  });

  return zip.generateAsync(options, onUpdate);
}
