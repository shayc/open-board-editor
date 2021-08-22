import * as OBF from '../../interfaces';
import { createLicense } from './license';

export const licenseMap = {
  toDomain(raw: any): OBF.License {
    const license = createLicense(raw);

    return license;
  },

  toDTO(license: OBF.License): OBF.LicenseDTO {
    const {
      type,
      copyright_notice_url: copyrightNoticeUrl,
      source_url: sourceUrl,
      author_name: authorName,
      author_url: authorUrl,
      author_email: authorEmail,
    } = license;

    const dto: OBF.LicenseDTO = {
      type,
      copyrightNoticeUrl,
      sourceUrl,
      authorName,
      authorUrl,
      authorEmail,
    };

    return dto;
  },

  toPersistence(license: OBF.Image): any {},
};
