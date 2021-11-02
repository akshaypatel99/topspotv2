import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

export function renderWithClient(ui) {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>
			<BrowserRouter>{ui}</BrowserRouter>
		</QueryClientProvider>
	);
	return {
		...result,
		rerender: (rerenderUi) =>
			rerender(
				<QueryClientProvider client={testQueryClient}>
					{rerenderUi}
				</QueryClientProvider>
			),
	};
}

export function createWrapper() {
	const testQueryClient = createTestQueryClient();
	return ({ children }) => (
		<QueryClientProvider client={testQueryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	);
}
