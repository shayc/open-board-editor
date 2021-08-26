import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import ViewButton from './ViewButton';

describe('<ViewButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = {};

    renderWithReactIntl(<ViewButton {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
