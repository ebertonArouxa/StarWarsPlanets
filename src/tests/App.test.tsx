import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedApi from '../Mock/apiMock';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockedApi),
    });
  });

  test('test if home page is rendind correctly', () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox', {  name: /search planet:/i});
    const column = screen.getByText(/column/i);
    const operator = screen.getByText(/operator/i);
    const number = screen.getByRole('spinbutton');
    const submitButton = screen.getByRole('button', {  name: /filter/i});
    expect(searchInput).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

  test('test if return fetch from api', () => {
    render(<App />);
    expect(global.fetch).toBeCalledTimes(1)
  })
  
  test('test if search input works', async () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox', {  name: /search planet:/i});
    userEvent.type(searchInput, 'ta')
    const searchResult = await screen.findByText('Tatooine');
    expect(searchResult).toBeInTheDocument();
  })

  test('test if form inputs works with maior que', async () => {
    render(<App />);
    const number = screen.getByRole('spinbutton');
    userEvent.type(number, '30000000')
    const submitButton = screen.getByRole('button', {  name: /filter/i});
    userEvent.click(submitButton)
    const planet1 = await screen.findByText('Alderaan');
    const planet2 = await screen.findByText('Naboo');
    const planet3 = await screen.findByText('Coruscant');
    const planet4 = await screen.findByText('Kamino');
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(planet3).toBeInTheDocument();
    expect(planet4).toBeInTheDocument();
  })

  test('test if form inputs works with menor que', async () => {
    render(<App />);
    const number = screen.getByRole('spinbutton');
    userEvent.type(number, '30000000')
    const submitButton = screen.getByRole('button', {  name: /filter/i});
    const operator = screen.getByRole('combobox', {  name: /operator/i});
    userEvent.selectOptions(operator, 'menor que')
    userEvent.click(submitButton)
    const planet1 = await screen.findByText('Tatooine');
    const planet2 = await screen.findByText('Yavin IV');
    const planet3 = await screen.findByText('Bespin');
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(planet3).toBeInTheDocument();
  })

  test('test if form inputs works with igual a', async () => {
    render(<App />);
    const number = screen.getByRole('spinbutton');
    userEvent.type(number, '200000')
    const submitButton = screen.getByRole('button', {  name: /filter/i});
    const operator = screen.getByRole('combobox', {  name: /operator/i});
    userEvent.selectOptions(operator, 'igual a')
    userEvent.click(submitButton)
    const planet1 = await screen.findByText('Tatooine');
    expect(planet1).toBeInTheDocument();
  })
});
