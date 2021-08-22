import { renderWithReactIntl } from '../../setupTests';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<NavBar />);
    expect(spy).not.toHaveBeenCalled();
  });
});
