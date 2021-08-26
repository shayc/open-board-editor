import { renderWithProviders } from './setupTests';
import App from './App';

test('renders loading text', () => {
  renderWithProviders(<App />);
});
