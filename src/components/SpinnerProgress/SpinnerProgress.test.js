import { renderWithReactIntl } from '../../setupTests';
import SpinnerProgress from './SpinnerProgress';

describe('<SpinnerProgress />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    renderWithReactIntl(<SpinnerProgress />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render loading text', () => {
    const { getByText } = renderWithReactIntl(<SpinnerProgress />);
    const loadingElement = getByText(/loading/i);

    expect(loadingElement).toBeInTheDocument();
  });
});
