import { renderWithReactIntl } from '../../setupTests';
import BoardList from './BoardList';

describe('<BoardList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      items: [],
    };

    renderWithReactIntl(<BoardList {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
