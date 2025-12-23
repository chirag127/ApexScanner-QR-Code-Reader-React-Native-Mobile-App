import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /ApexScanner/i, level: 1 });
  expect(headingElement).toBeInTheDocument();
});
