import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders initial text at initial state', () => {
  const { getByText } = render(<App />);
  const initialText = getByText(
    'Please agree so we could check your localization :)'
  );
  expect(initialText).toBeInTheDocument();
});

test('renders search input at initial state', () => {
  const { getByTestId } = render(<App />);
  const searchInput = getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
});
