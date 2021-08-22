import { renderWithProviders } from '../../../setupTests';
import LanguageSettings from './LanguageSettings';

describe('<LanguageSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithProviders(<LanguageSettings />);
    expect(spy).not.toHaveBeenCalled();
  });
});
