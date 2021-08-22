import * as OBF from '../../interfaces';

export function createLicense(props?: Partial<OBF.License>): OBF.License {
  const license = {
    type: 'All Rights Reserved',
    source_url: '',
    author_email: '',
    author_name: '',
    author_url: '',
    copyright_notice_url: '',
    ...props,
  };

  return license;
}
