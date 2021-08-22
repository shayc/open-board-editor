import { renderWithReactIntl } from '../../setupTests';
import NavButtons from './NavButtons';

describe('<NavButtons />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      onBackClick: () => {},
      onHomeClick: () => {},
    };

    renderWithReactIntl(<NavButtons {...props} />);

    expect(spy).not.toHaveBeenCalled();
  });
});
