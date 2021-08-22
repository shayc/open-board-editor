import * as OBF from '../interfaces';
import { createLicense } from './license/license';
import { createBoard } from './board';
import { buttonMap } from './button/button.map';
import { imageMap } from './image/image.map';
import { soundMap } from './sound/sound.map';
import { licenseMap } from './license/license.map';

export const boardMap = {
  toDomain(raw: any): OBF.Board {
    const board = createBoard({
      ...raw,
      buttons: raw.buttons.map((rawButton: any) =>
        buttonMap.toDomain(rawButton)
      ),
      license: createLicense(raw.license),
    });

    return board;
  },

  toDTO(board: OBF.Board): OBF.BoardDTO {
    const {
      id,
      name,
      buttons,
      grid,
      images,
      sounds,
      format,
      license,
      description_html,
    } = board;

    const dto: OBF.BoardDTO = {
      id,
      name,
      buttons: buttons.map((button) => {
        const assets = getButtonAssets(button, { images, sounds });
        return buttonMap.toDTO(button, assets);
      }),
      grid,
      format,
      license: license && licenseMap.toDTO(license),
      descriptionHtml: description_html,
    };

    return dto;
  },

  toPersistence(board: OBF.Board): any {},
};

function getButtonAssets(
  button: OBF.Button,
  assets: {
    images: OBF.Image[];
    sounds: OBF.Sound[];
  }
): {
  image: OBF.ImageDTO | null;
  sound: OBF.SoundDTO | null;
} {
  const image =
    (button.image_id && assets.images.find((i) => i.id === button.image_id)) ||
    null;

  const sound =
    (button.sound_id && assets.sounds.find((s) => s.id === button.sound_id)) ||
    null;

  const buttonAssets = {
    image: image && imageMap.toDTO(image),
    sound: sound && soundMap.toDTO(sound),
  };

  return buttonAssets;
}
