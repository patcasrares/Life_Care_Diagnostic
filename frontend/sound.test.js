import React from 'react';
import { TextEncoder } from 'text-encoding';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import App from './pages/covid';
import '@testing-library/jest-dom';


import { useRouter } from 'next/router';


// eslint-disable-next-line no-undef
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { resource: 'diagnostic' },
    // other properties and methods you need
  }),
}));


jest.mock('axios');

// Set up a mock implementation for URL.createObjectURL
window.URL.createObjectURL = function() {};

// eslint-disable-next-line no-undef
jest.mock('react-media-recorder', () => ({
  // eslint-disable-next-line no-undef
  ReactMediaRecorder: jest.fn().mockReturnValue(<div>Mock ReactMediaRecorder</div>)
}));

/**
 * @jest-environment node 
 */
// eslint-disable-next-line no-undef
describe('App', () => {
 
  it('displays skin diagnostic', async () => {
    const expectedVerdict = '0';
    axios.get.mockResolvedValueOnce({ data: expectedVerdict });
    axios.post.mockResolvedValueOnce({ data: expectedVerdict });
    render(<App />);

    const fileInput = screen.getByPlaceholderText('******************');

    const submitButton = screen.getAllByRole('button')[0];
    
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/sound',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      //const myDiv = screen.getById('modal-example-large');
      //const text = myDiv.textContent;
      //expect(text).toBe('Hello, world!');
      
      const allText = document.body.textContent;
      expect(allText).toContain('here are signs of covid');
    });
  });
});
