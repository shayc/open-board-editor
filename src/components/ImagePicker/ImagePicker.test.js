import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import ImagePicker from './ImagePicker';

describe('<ImagePicker />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      images: [],
      onChange: () => {},
    };

    renderWithReactIntl(<ImagePicker {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
