// import { screen } from '@testing-library/react';
import { renderWithClient } from './utils';
import TopArtists from '../pages/TopArtists';
import { useFetch } from '../helpers/useFetch';
import { testArtists } from './testData';

jest.mock('../helpers/useFetch', () => ({
	useFetch: jest.fn(),
}));

describe('TopArtists', () => {
	beforeEach(() => {
		useFetch.mockImplementation(() => ({}));
	});

	test('should render loader while loading', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'loading',
		}));
		const result = renderWithClient(<TopArtists />);
		expect(result.getByText(/loading/i)).toBeInTheDocument();
		// screen.debug();
	});

	test('displays time range menu on top artists page', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'idle',
		}));

		const result = renderWithClient(<TopArtists />);

		const allTime = result.getByText(/All Time/i);
		const pastSixMonths = result.getByText(/Past 6 Months/i);
		const pastMonth = result.getByText(/Past Month/i);
		expect(allTime).toBeInTheDocument();
		expect(pastSixMonths).toBeInTheDocument();
		expect(pastMonth).toBeInTheDocument();
		// screen.debug();
	});

	test('with data, renders artists cards and table', () => {
		useFetch.mockImplementation(() => ({
			data: testArtists,
			status: 'success',
		}));

		const result = renderWithClient(<TopArtists />);
		// screen.debug();

		const artistNameElements = result.getAllByRole('heading', {
			name: 'Kendrick Lamar',
		});
		const genreElements = result.getAllByText('conscious hip hop');

		expect(artistNameElements[0]).toBeInTheDocument();
		expect(result.getByAltText('Kendrick Lamar')).toBeInTheDocument();
		expect(result.getByTestId('artists-table')).toBeInTheDocument();
		expect(genreElements[1]).toBeInTheDocument();
	});

	test('with error, renders error message', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'error',
			error: { body: { error_description: 'Something went wrong' } },
		}));

		const result = renderWithClient(<TopArtists />);
		expect(result.getByText(/Something went wrong/i)).toBeInTheDocument();
	});
});
