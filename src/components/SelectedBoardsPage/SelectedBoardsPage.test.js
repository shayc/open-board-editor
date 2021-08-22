import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import SelectedBoardsPage from './SelectedBoardsPage';

describe('<SelectedBoardsPage />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<SelectedBoardsPage />);
    expect(spy).not.toHaveBeenCalled();
  });
});
