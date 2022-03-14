import { render, screen } from '@testing-library/react';
import App from './App';
import Trips from './components/Trips';

test('renders Your trips app', () => {
  render(<App />);
  const element = screen.getByText(/Your trips app/i);
  expect(element).toBeInTheDocument();
});
