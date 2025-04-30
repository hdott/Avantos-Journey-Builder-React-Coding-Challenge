import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

/*jest.mock('../features/flow/flowAPI', () => ({
  useGetFlowDataQuery: () => ({
    data: { nodes: [{ id: 'node1' }], forms: [] },
    isLoading: false,
    error: null
  }),
}));*/

test('renders app loading', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
