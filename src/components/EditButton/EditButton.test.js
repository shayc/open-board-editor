import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import EditButton from './EditButton';

describe('<EditButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = {};

    renderWithReactIntl(<EditButton {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
