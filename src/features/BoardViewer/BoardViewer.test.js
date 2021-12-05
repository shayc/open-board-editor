import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import BoardViewer from './BoardViewer';

describe('<BoardViewer />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<BoardViewer />);
    expect(spy).not.toHaveBeenCalled();
  });
});
