import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './pages/index';
import '@testing-library/jest-dom';


import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { resource: 'diagnostic' },
    // other properties and methods you need
  }),
}));


jest.mock('axios');

/**
 * @jest-environment node 
 */
describe('App', () => {
  it('displays tumor diagnostic', async () => {
    const expectedVerdict = '22';
    axios.get.mockResolvedValueOnce({ data: expectedVerdict });
    axios.post.mockResolvedValueOnce({ data: expectedVerdict });
    render(<App />);

    const inputs = screen.queryAllByRole('textbox');
    expect(inputs).toHaveLength(2);

    const firstNameInput = inputs[0];
    const lastNameInput = inputs[1];

    const fileInput = screen.getByPlaceholderText('******************');


    const submitButton = screen.getAllByRole('button')[0];

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/breastCancer',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      //const myDiv = screen.getById('modal-example-large');
      //const text = myDiv.textContent;
      //expect(text).toBe('Hello, world!');
      
      const allText = document.body.textContent;
      expect(allText).toContain('malign');
    });
  });
});
