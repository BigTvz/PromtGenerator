import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main application header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Prompt Builder Studio/i);
  expect(headerElement).toBeInTheDocument();
});
