import React from 'react';
import { renderWithProviders } from '../../setupTests';
import GridSizeSelect from './GridSizeSelect';

describe('<GridSizeSelect />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithProviders(<GridSizeSelect />);
    expect(spy).not.toHaveBeenCalled();
  });
});
