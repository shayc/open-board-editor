import { renderWithProviders } from '../../../setupTests';
import BoardSettings from './BoardSettings';

describe('<BoardSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithProviders(<BoardSettings />);
    expect(spy).not.toHaveBeenCalled();
  });
});
