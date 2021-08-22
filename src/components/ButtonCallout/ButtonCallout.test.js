import { renderWithReactIntl } from '../../setupTests';
import ButtonCallout from './ButtonCallout';

describe('<ButtonCallout />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const props = {
      button: {},
      images: [],
      colors: [],
      onDiscard: () => {},
      onSave: () => {},
    };

    renderWithReactIntl(<ButtonCallout {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
