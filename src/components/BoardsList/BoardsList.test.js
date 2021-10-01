import { renderWithReactIntl } from '../../setupTests';
import BoardsList from './BoardsList';

describe('<BoardsList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      items: [],
    };

    renderWithReactIntl(<BoardsList {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
