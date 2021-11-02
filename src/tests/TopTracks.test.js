// import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from './utils';
import TopTracks from '../pages/TopTracks';
import { useFetch } from '../helpers/useFetch';
import { testTracks } from './testData';

jest.mock('../helpers/useFetch', () => ({
	useFetch: jest.fn(),
}));

describe('TopTracks', () => {
	beforeEach(() => {
		useFetch.mockImplementation(() => ({}));
	});

	test('should render loader while loading', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'loading',
		}));
		const result = renderWithClient(<TopTracks />);
		expect(result.getByText(/loading/i)).toBeInTheDocument();
		// screen.debug();
	});

	test('displays options menu on top tracks page', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'idle',
		}));

		const result = renderWithClient(<TopTracks />);

		const resultsBtn = result.getByRole('button', { name: /All Results/i });
		const tracksBtn = result.getByRole('button', { name: /Show Tracks/i });
		const playlistBtn = result.getByRole('button', {
			name: /Create playlist/i,
		});
		expect(resultsBtn).toBeInTheDocument();
		expect(tracksBtn).toBeInTheDocument();
		expect(playlistBtn).toBeInTheDocument();
		userEvent.click(tracksBtn);
		expect(
			result.getByRole('button', { name: /Show album art/i })
		).toBeInTheDocument();
	});

	test('with data, renders track cards and table', () => {
		useFetch.mockImplementation(() => ({
			data: testTracks,
			status: 'success',
		}));

		const result = renderWithClient(<TopTracks />);
		// screen.debug();

		const trackNameElements = result.getAllByRole('heading', {
			name: 'Closer',
		});
		const artistNameElements = result.getAllByRole('heading', {
			name: 'Jaden Thompson',
		});

		expect(trackNameElements[0]).toBeInTheDocument();
		expect(artistNameElements[0]).toBeInTheDocument();
		expect(result.getByAltText('Closer')).toBeInTheDocument();
		expect(result.getByTestId('tracks-table')).toBeInTheDocument();
		expect(result.getByTestId('tracks-features')).toBeInTheDocument();
	});

	test('with error, renders error message', () => {
		useFetch.mockImplementation(() => ({
			data: { items: [] },
			status: 'error',
			error: { body: { error_description: 'Something went wrong' } },
		}));

		const result = renderWithClient(<TopTracks />);
		expect(result.getByText(/Something went wrong/i)).toBeInTheDocument();
	});
});
