// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const flowAPI = createApi({
  reducerPath: 'flowAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/123/actions/blueprints/123/graph' }),
  endpoints: (builder) => ({
    getFlowData: builder.query({
      query: () => ``,
      
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFlowDataQuery } = flowAPI