import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Type text into the form and hit submit/i);
  expect(linkElement).toBeInTheDocument();
});
