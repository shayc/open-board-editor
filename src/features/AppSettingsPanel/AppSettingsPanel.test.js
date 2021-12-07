import { renderWithProviders } from '../../setupTests';
import AppSettingsPanel from './AppSettingsPanel';

describe('<AppSettingsPanel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      open: false,
      onDismiss: () => {},
    };

    renderWithProviders(<AppSettingsPanel {...props} />);

    expect(spy).not.toHaveBeenCalled();
  });
});
