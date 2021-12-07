import { renderWithProviders } from '../../../setupTests';
import ColorSettings from './ColorSettings';

describe('<ColorSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithProviders(<ColorSettings />);

    expect(spy).not.toHaveBeenCalled();
  });
});
