import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../constants";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOrders: builder.query({
      query: () => `${DASHBOARD_URL}/total-orders`,
    }),
    getTotalSales: builder.query({
      query: () => `${DASHBOARD_URL}/total-sales`,
    }),
    getSalesByDate: builder.query({
      query: () => `${DASHBOARD_URL}/sales-by-date`,
    }),
  }),
});

export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetSalesByDateQuery,
} = dashboardApiSlice;