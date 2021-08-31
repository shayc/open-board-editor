import React from 'react';
import { renderWithReactIntl } from '../../setupTests';
import SettingsButton from './SettingsButton';

describe('<SettingsButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = {};

    renderWithReactIntl(<SettingsButton {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
