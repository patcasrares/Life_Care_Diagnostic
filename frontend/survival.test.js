import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './pages/survival';
import '@testing-library/jest-dom';


import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { resource: 'survival' },
    // other properties and methods you need
  }),
}));


jest.mock('axios');

/**
 * @jest-environment node 
 */
describe('App', () => {
  it('displays survival chances on form submission', async () => {
    const expectedVerdict = 'Low chances';
    axios.get.mockResolvedValueOnce({ data: expectedVerdict });
    render(<App />);

    const inputs = screen.queryAllByRole('textbox');
    expect(inputs).toHaveLength(4);

    const firstNameInput = inputs[0];
    const lastNameInput = inputs[1];
    const ageInput = inputs[2];
    const nodesInput = inputs[3];
    const submitButton = screen.getAllByRole('button')[0];

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(ageInput, { target: { value: '50' } });
    fireEvent.change(nodesInput, { target: { value: '2' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:5000/survivalChances',
        { params: { age: '50', nodes: '2' } }
      );
      //const myDiv = screen.getById('modal-example-large');
      //const text = myDiv.textContent;
      //expect(text).toBe('Hello, world!');
      
      const allText = document.body.textContent;
      expect(allText).toContain('Low chances');
    });
  });
});
