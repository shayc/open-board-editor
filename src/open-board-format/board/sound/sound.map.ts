import * as OBF from '../../interfaces';
import { licenseMap } from '../license/license.map';
import { createSound } from './sound';

export const soundMap = {
  toDomain(raw: any): OBF.Sound {
    const sound = createSound(raw);

    return sound;
  },

  toDTO(sound: OBF.Sound): OBF.SoundDTO {
    const {
      id,
      data,
      path,
      url,
      data_url: dataUrl,
      content_type: contentType,
      license,
      duration,
    } = sound;

    const dto: OBF.SoundDTO = {
      id,
      data,
      path,
      url,
      dataUrl,
      contentType,
      license: license && licenseMap.toDTO(license),
      duration,
    };

    return dto;
  },

  toPersistence(sound: OBF.Sound): any {},
};
