import { render, screen } from '@testing-library/react';
import { API_URL } from '../../utils/constants';
import axios from 'axios';
import Home from '.';

describe('Test Home', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test Render', async () => {
    //Arrange: Setup the mock API
    const mockGet = jest.spyOn(axios, 'get');

    mockGet.mockImplementation((url) => {
      switch (url) {
        case `${API_URL}/api/category/?format=json`:
          return Promise.resolve({
            data: {
              status: 'success',
              data: [
                {
                  id: 1,
                  name: 'Handhelds',
                  description: "So big, you don't need thumbs.",
                },
                {
                  id: 2,
                  name: 'Appeteasers',
                  description: 'Tease the hangry hippo, he get hangrier',
                },
              ],
            },
          });
        default:
          return Promise.resolve({
            data: {
              status: 'fail',
            },
          });
      }
    });

    //Act: Call the Home page
    render(<Home />);

    //Assert: Check the values in the rendered Home page.
    expect(await screen.findAllByTestId(/category-item/i)).toHaveLength(2);
    expect(await screen.findByText('Appeteasers')).toBeInTheDocument();
  });

  test('Test Home integration with category API data', async () => {
    //Arrange: Setup the mock API
    const mockGet = jest.spyOn(axios, 'get');

    mockGet.mockImplementation((url) => {
      switch (url) {
        case `${API_URL}/api/category/?format=json`:
          return Promise.resolve({
            data: {
              status: 'success',
              data: [
                {
                  id: 1,
                  name: 'Handhelds',
                  description: "So big, you don't need thumbs.",
                },
                {
                  id: 2,
                  name: 'Appeteasers',
                  description: 'Tease the hangry hippo, he get hangrier',
                },
              ],
            },
          });
        default:
          return Promise.resolve({
            data: {
              status: 'fail',
            },
          });
      }
    });

    //Act: Render the Home page, which should load and display categories.
    render(<Home />);

    //Assert: The Home page integrates with the category API response.
    expect(mockGet).toHaveBeenCalledWith(`${API_URL}/api/category/?format=json`);
    expect(await screen.findByText('Handhelds')).toBeInTheDocument();
    expect(await screen.findByText('Appeteasers')).toBeInTheDocument();
  });
});
