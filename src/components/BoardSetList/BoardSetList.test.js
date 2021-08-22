import { renderWithReactIntl } from '../../setupTests';
import BoardSetList from './BoardSetList';

describe('<BoardSetList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const items = [];

    renderWithReactIntl(<BoardSetList items={items} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
