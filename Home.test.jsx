// Importing necessary modules
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './src/Components/Home.jsx';

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.fetch = fetchMock;
// Mock the API response
fetch.mockResolvedValueOnce({
  json: () => Promise.resolve([
    {
      title: 'Sonnet 18',
      lines: ['Shall I compare thee to a summer\'s day?'],
      linecount: '1',
      author: 'Shakespeare',
    },
    
  ]),
  status: 200,
});

test('renders Home component and fetches data', async () => {
  render(<Home />);

  // user input and form submission
  const input = screen.getByPlaceholderText('Enter text here');
  userEvent.type(input, 'William Blake');
  userEvent.click(screen.getByText(/Submit/i));

  // Waiting for the data to be fetched
  await waitFor(() => {
    // Perform assertions based on expected behavior after submission
    expect(screen.getByText(/Sonnet 18/i)).toBeInTheDocument();
    expect(screen.getByText(/Shakespeare/i)).toBeInTheDocument();
  });
});
