import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import BoardCommandBar from './BoardCommandBar';

describe('<BoardCommandBar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<BoardCommandBar />);
    expect(spy).not.toHaveBeenCalled();
  });
});
