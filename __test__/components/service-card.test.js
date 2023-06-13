import renderer from 'react-test-renderer';
import ServiceCard from '../../components/service-card'
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from 'react';
jest.mock('next/dist/client/router', () => require('next-router-mock'));
const mockStore = configureMockStore();
const store = mockStore({
    status: {
        loading: false,
        success: false,
        error: false,
        message: "",
        userType: "",
        currentConversation: 0,
        showSidebar: false,
        showLogoutModal: false,
    }
});

it('renders correctly', () => {
  const queryClient = new QueryClient();
  const tree = renderer
    .create(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ServiceCard />
            </Provider>
        </QueryClientProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
