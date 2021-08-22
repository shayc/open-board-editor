import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import ColorPicker from './ColorPicker';

describe('<ColorPicker />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = { colors: [], onChange: () => {} };

    renderWithReactIntl(<ColorPicker {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
