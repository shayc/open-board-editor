import { renderWithReactIntl } from '../../../setupTests';
import About from './About';

describe('<About />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<About />);
    expect(spy).not.toHaveBeenCalled();
  });
});
