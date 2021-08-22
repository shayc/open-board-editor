import { renderWithReactIntl } from '../../setupTests';
import DetailsPanel from './DetailsPanel';

describe('<DetailsPanel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = { onDismiss: () => {} };

    renderWithReactIntl(<DetailsPanel {...props} />);

    expect(spy).not.toHaveBeenCalled();
  });
});
