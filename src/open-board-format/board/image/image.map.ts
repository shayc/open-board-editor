import * as OBF from '../../interfaces';
import { licenseMap } from '../license/license.map';
import { createImage } from './image';

export const imageMap = {
  toDomain(raw: any): OBF.Image {
    const image = createImage(raw);

    return image;
  },

  toDTO(image: OBF.Image): OBF.ImageDTO {
    const {
      id,
      data,
      path,
      url,
      data_url: dataUrl,
      content_type: contentType,
      license,
    } = image;

    const dto: OBF.ImageDTO = {
      id,
      data,
      path,
      url,
      dataUrl,
      contentType,
      license: license && licenseMap.toDTO(license),
    };

    return dto;
  },

  toPersistence(image: OBF.Image): any {},
};
