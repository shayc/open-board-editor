import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import EditToggleButton from './EditToggleButton';

describe('<EditToggleButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = {};

    renderWithReactIntl(<EditToggleButton {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
