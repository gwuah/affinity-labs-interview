import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';
import axiosMock from 'axios';

jest.mock('axios');
jest.mock('rc-upload');

const response = {
  results: {
    google: {
      totalCost: 2400,
      totalHours: 8,
      logs: [{ id: '1', hours: 8, rate: 300, cost: 2400, key: '1' }],
    },
    facebook: {
      totalCost: 1500,
      totalHours: 15,
      logs: [
        { id: '1', hours: 10, rate: 100, cost: 1000, key: '1' },
        { id: '2', hours: 5, rate: 100, cost: 500, key: '2' },
      ],
    },
  },
};

describe('App', () => {
  it('renders component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app')).toBeInTheDocument();
  });

  it('tests the file upload button', () => {
    axiosMock.post.mockResolvedValueOnce({
      data: response,
    });

    const { getByTestId } = render(<App />);
    const uploadButton = getByTestId('mock-upload-button');

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });

    Object.defineProperty(uploadButton, 'files', {
      value: [file],
    });

    fireEvent.change(uploadButton);

    expect(uploadButton).toBeInTheDocument();
  });

  it('tests that errors are well handled', async () => {
    axiosMock.post.mockResolvedValueOnce(new Error('random'));

    const { getByTestId, getByText } = render(<App />);
    const uploadButton = getByTestId('mock-upload-button');

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });

    Object.defineProperty(uploadButton, 'files', {
      value: [file],
    });

    fireEvent.change(uploadButton);

    await waitForElement(() => getByTestId('error-message'));

    expect(getByTestId('error-message')).toBeInTheDocument();
  });
});
