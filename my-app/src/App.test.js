import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import PrefillPanel from './components/PrefillPanel';
import { configureStore } from '@reduxjs/toolkit';
import { flowAPI } from './features/flow/flowAPI';

jest.mock('./features/flow/flowAPI', () => {
  const mock = {
    reducerPath: 'flowAPI',
    reducer: () => ({}),
    middleware: () => (next) => (action) => next(action),
    useGetFlowDataQuery: () => ({
      data: {
        nodes: [
          {
            id: '1',
            type: 'default',
            position: { x: 100, y: 100 },
            data: { label: 'Node 1' },
          },
          {
            id: '2',
            type: 'default',
            position: { x: 150, y: 100 },
            data: { label: 'Node 2' },
          }
        ],
        edges: [
          {
            id: 'e1-2',
            source: '1',
            target: '2',
          },
        ],
        forms: [],
      },
      isLoading: false,
      error: null,
    }),
  };
  return {
    flowAPI: mock,
    useGetFlowDataQuery: mock.useGetFlowDataQuery,
    default: mock,
  };
});


const mockStore = configureStore({
  reducer: {
    [flowAPI.reducerPath]: flowAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowAPI.middleware),
});

//https://henggana.com/blog/fix-jest-resize-observer-is-not-defined/
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

test('renders app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText("Node 1")).toBeInTheDocument();
});

test('renders PrefillPannel', () => {
  render(
    <Provider store={store}>
      <PrefillPanel nodeId={"form-bad163fd-09bd-4710-ad80-245f31b797d5"}/>
    </Provider>  );

  expect(screen.getByText("CLOSE")).toBeInTheDocument();
});