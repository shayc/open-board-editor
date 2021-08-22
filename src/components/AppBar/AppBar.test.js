import { renderWithProviders } from '../../setupTests';
import AppBar from './AppBar';

describe('<AppBar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {};

    renderWithProviders(<AppBar {...props} />);

    expect(spy).not.toHaveBeenCalled();
  });
});
