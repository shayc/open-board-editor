import { openDB, DBSchema, StoreNames, IDBPDatabase } from 'idb';
import sanitize from 'sanitize-filename';

import * as OBF from '../interfaces';
import { boardMap } from './board.map';

interface BoardDB extends DBSchema {
  manifest: {
    key: string;
    value: any;
  };
  boards: {
    key: string;
    value: OBF.Board;
    indexes: {
      id: string;
      name: string;
    };
  };
  files: {
    key: string;
    value: {
      type: string;
      data: ArrayBuffer;
    };
  };
}

type DBStoreName = StoreNames<BoardDB>;

const DB_NAME = 'board';
const DB_VERSION = 1;

let shouldInit = false;

const dbPromise = openDB<BoardDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    shouldInit = true;

    const boardsStore = db.createObjectStore('boards');
    boardsStore.createIndex('id', 'id', { unique: true });

    db.createObjectStore('manifest');
    db.createObjectStore('files');
  },
});

dbPromise.then((db) => {
  if (shouldInit) {
    initManifest(db);
  }
});

export const boardRepo = {
  async add(board: OBF.Board) {
    const db = await dbPromise;
    const tx = await db.transaction(['boards', 'manifest'], 'readwrite');

    const boardsStore = await tx.objectStore('boards');
    const manifestStore = await tx.objectStore('manifest');

    const filename = sanitize(board.name);
    const path = `${filename}.obf`;

    const manifestPaths = await manifestStore.get('paths');
    manifestPaths.boards[board.id] = path;
    manifestStore.put(manifestPaths, 'paths');

    await boardsStore.add(board, path);

    return board.id;
  },

  async addFile(file: { type: string; data: ArrayBuffer }, path: string) {
    const db = await dbPromise;
    await db.put('files', file, path);
  },

  async reset() {
    const db = await dbPromise;

    return Promise.all([
      db.clear('manifest'),
      db.clear('boards'),
      db.clear('files'),
    ]);
  },

  async remove(id: string | string[]) {
    const ids = Array.isArray(id) ? id : [id];
    const db = await dbPromise;

    const tx = await db.transaction(
      ['boards', 'files', 'manifest'],
      'readwrite'
    );

    const boardStore = await tx.objectStore('boards');
    const manifestStore = await tx.objectStore('manifest');

    const manifestPaths = await manifestStore.get('paths');
    ids.forEach((id) => delete manifestPaths.boards[id]);
    manifestStore.put(manifestPaths, 'paths');

    let boardCursor = await boardStore.index('id').openCursor();

    while (boardCursor) {
      if (ids.includes(boardCursor.key)) {
        deleteBoardFiles(boardCursor.value);
        boardCursor.delete();
      }

      boardCursor = await boardCursor.continue();
    }
  },

  async exportBoardSet(): Promise<OBF.BoardSet> {
    const manifest = await exportStore('manifest');
    const boards = await exportStore('boards');
    const files = await exportStore('files');

    const boardSet = {
      boards,
      files,
      manifest,
    };

    return boardSet;
  },

  async getAll(): Promise<OBF.Board[]> {
    const db = await dbPromise;
    const boards = await db.getAll('boards');

    return boards.map((b) => boardMap.toDomain(b));
  },

  async getById(id: string): Promise<OBF.Board | null> {
    const db = await dbPromise;
    const board = await db.getFromIndex('boards', 'id', id);
    const files = board ? await this.getBoardFiles(board) : [];
    const inlinedBoard = board && (await inlineBoardFiles(board, files));

    return inlinedBoard ? boardMap.toDomain(inlinedBoard) : null;
  },

  async getByPath(path: string): Promise<OBF.Board | null> {
    const db = await dbPromise;
    const board = await db.get('boards', path);
    const files = board ? await this.getBoardFiles(board) : [];
    const inlinedBoard = board && (await inlineBoardFiles(board, files));

    return inlinedBoard ? boardMap.toDomain(inlinedBoard) : null;
  },

  async getBoardFiles(board: OBF.Board) {
    const paths = board.buttons
      .map((button) => getButtonMediaFilePaths(button, board))
      .flat();

    const filesPromises = paths.map(async (path) => {
      const rawFile = path ? await this.getFile(path) : null;
      const file = { ...rawFile, path } as OBF.File;

      return file;
    });

    const files = await Promise.all(filesPromises);

    return files;
  },

  async getFile(path: string) {
    const db = await dbPromise;
    const file = await db.get('files', path);

    return file;
  },

  async getRoot(): Promise<OBF.Board | undefined> {
    const db = await dbPromise;

    const rootPath = await db.get('manifest', 'root');
    const rootBoard = rootPath && (await db.get('boards', rootPath));

    return rootBoard;
  },

  async importBoardSet(boardSet: OBF.BoardSet) {
    const { boards, files, manifest } = boardSet;
    const db = await dbPromise;

    await Promise.all([
      ...Object.keys(manifest).map((key) =>
        db.put('manifest', manifest[key], key)
      ),
      ...Object.keys(boards).map((key) => db.put('boards', boards[key], key)),
      ...Object.keys(files).map((key) => db.put('files', files[key], key)),
    ]);
  },

  async update(board: OBF.Board) {
    if (!board.id) {
      return;
    }

    const db = await dbPromise;
    const tx = await db.transaction(['boards', 'manifest'], 'readwrite');

    const boardsStore = await tx.objectStore('boards');
    const manifestStore = await tx.objectStore('manifest');

    const boardsById = await boardsStore.index('id');
    const existingBoard = await boardsById.get(board.id);
    const path = await boardsById.getKey(board.id);

    const manifestPaths = await manifestStore.get('paths');
    manifestPaths.boards[board.id] = path;
    manifestStore.put(manifestPaths, 'paths');

    // const mergedButtons = existingBoard?.buttons.map((button) => {
    //   const modifiedButton = board.buttons.find((b) => b.id === button.id);
    //   return { ...button, ...modifiedButton };
    // });

    boardsStore.put({ ...existingBoard, ...board }, path);
  },

  async setRootId(id: string) {
    const db = await dbPromise;
    const tx = await db.transaction(['boards', 'manifest'], 'readwrite');

    const boardsStore = await tx.objectStore('boards');
    const manifestStore = await tx.objectStore('manifest');

    const boardsById = await boardsStore.index('id');
    const rootBoardPath = await boardsById.getKey(id);

    manifestStore.put(rootBoardPath, 'root');
  },
};

async function initManifest(db: IDBPDatabase<BoardDB>) {
  const format = 'open-board-0.1';
  const root = '';

  const paths = {
    boards: {},
    images: {},
    sounds: {},
  };

  db.add('manifest', format, 'format');
  db.add('manifest', root, 'root');
  db.add('manifest', paths, 'paths');
}

async function exportStore(storeName: DBStoreName) {
  const db = await dbPromise;

  const storeKeys = await db.getAllKeys(storeName);
  const storeValues = await db.getAll(storeName);
  const storeEntries = storeKeys.map((key, i) => [key, storeValues[i]]);
  const object = Object.fromEntries(storeEntries);

  return object;
}

async function deleteBoardFiles(board: OBF.Board) {
  const db = await dbPromise;
  const tx = await db.transaction(['boards', 'manifest'], 'readwrite');

  const boardsStore = await tx.objectStore('boards');
  const manifestStore = await tx.objectStore('manifest');
  const manifestPaths: any = await manifestStore.get('paths');

  // TODO: refactor for simplicity also memoize
  const fileRefs = getBoardFileRefs(board);

  let boardCursor = await boardsStore.openCursor();

  while (boardCursor) {
    const cursorValue = boardCursor.value;

    if (cursorValue.id !== board.id) {
      const imagePaths = cursorValue.images
        ?.filter((i) => i.path)
        .map((i) => i.path);

      const soundPaths = cursorValue.sounds
        ?.filter((s) => s.path)
        .map((s) => s.path);

      const paths = [...imagePaths, ...soundPaths];

      for (let i = 0; i < paths.length; i++) {
        const refIndex = fileRefs.findIndex((ref) => ref.path === paths[i]);

        if (refIndex !== -1) {
          fileRefs.splice(refIndex, 1);
        }
      }
    }

    boardCursor = await boardCursor.continue();
  }

  fileRefs.forEach(({ id, path, type }) => {
    if (path) {
      db.delete('files', path);
      delete manifestPaths[type][id];
      manifestStore.put(manifestPaths, 'paths');
    }
  });
}

function getBoardFileRefs(board: OBF.Board) {
  const soundPaths = board.sounds
    .filter((s) => s.path)
    .map((s) => ({ path: s.path, id: s.id, type: 'sounds' }));

  const imagePaths = board.images
    .filter((i) => i.path)
    .map((i) => ({ path: i.path, id: i.id, type: 'images' }));

  const fileRefs = [...soundPaths, ...imagePaths];

  return fileRefs;
}

function getButtonMediaFilePaths(button: OBF.Button, board: OBF.Board) {
  const { image_id, sound_id } = button;

  const image = board.images.find((i) => i.id === image_id);
  const sound = board.sounds.find((s) => s.id === sound_id);
  const mediaPaths = [image?.path, sound?.path].filter((v) => Boolean(v));

  return mediaPaths;
}

async function inlineBoardFiles(board: OBF.Board, files: OBF.File[]) {
  const inlinedBoard = { ...board };

  inlinedBoard.images = inlineFiles(board.images, files);
  inlinedBoard.sounds = inlineFiles(board.sounds, files);

  return inlinedBoard;
}

function inlineFiles(mediaList: OBF.Media[], files: OBF.File[]) {
  const inlinedMediaList = mediaList.map((media) => {
    if (!media.path) {
      return media;
    }

    const file = files.find((f) => f.path === media.path);
    const blob = file && new Blob([file.data], { type: file.type });
    const objectURL = blob && URL.createObjectURL(blob);

    return { ...media, data: objectURL };
  });

  return inlinedMediaList;
}
