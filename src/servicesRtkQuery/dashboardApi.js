import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setApiError } from "../redux/globalSlice";
import { getUserDetailFromLocalSorage } from "../utils/localStorage";

const userId = () => {
  const { id } = getUserDetailFromLocalSorage();
  return id;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    headers.set("Authorization", `Bearer ${token.token}`);
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    alert('You are unathorized. please login again')
    localStorage.clear();
    window.location.reload();
    return
  }

  if (result.error && result.error.originalStatus > 499) {
    api.dispatch(setApiError({
      isShowError: Math.random(),
      statusCode: result?.error?.originalStatus
    }))
    return
  }
  return result;
};

export const dashboardApiSlice = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (id) => ({
        url: "get-dashboard-user-data",
        method: "GET",
        params: { user_id: id },
      }),
    }),
    getTransaction: builder.query({
      query: (payload) => ({
        url: "get-account-statement",
        method: "GET",
        params: payload,
      }),
    }),
    getBids: builder.query({
      query: (payload) => ({
        url: "get-bid",
        method: "GET",
        params: payload,
      }),
    }),
    withdrawMoney: builder.mutation({
      query: (payload) => ({
        url: "withdraw-request",
        method: "POST",
        body: payload,
      }),
    }),
    depositeMoney: builder.mutation({
      query: (payload) => ({
        url: "deposit-currency",
        method: "POST",
        body: payload,
      }),
    }),
    depositeOnMetMoney: builder.mutation({
      query: (payload) => ({
        url: "get-onmeta-webhook",
        method: "POST",
        body: payload,
      }),
    }),
    garbaseOnMetMoney: builder.mutation({
      query: (payload) => ({
        url: "garbase-onmeta",
        method: "POST",
        body: payload,
      }),
    }),
    createLink: builder.mutation({
      query: (payload) => ({
        url: "partner/create-partner-url",
        method: "POST",
        body: payload,
      }),
    }),
    willNotSignUpBonus: builder.mutation({
      query: (payload) => ({
        url: "partner/update-willnot-signupbonus",
        method: "POST",
        body: payload,
      }),
    }),
    partnerUser: builder.query({
      query: (payload) => ({
        url: "partner/dashboard-user-details-column",
        method: "GET",
        body: payload,
      }),
    }),
    lisitngLink: builder.query({
      query: (payload) => ({
        url: "partner/dashboard-statistics?partner_user_id=" + userId(),
        method: "GET",
      }),
    }),
    getPartnerDashboard: builder.query({
      query: (payload) => ({
        url: "/partner/dashboard-first-section?partner_user_id=" + userId(),
        method: "GET",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useLazyGetTransactionQuery,
  useLazyGetBidsQuery,
  useWithdrawMoneyMutation,
  useDepositeMoneyMutation,
  useDepositeOnMetMoneyMutation,
  useGarbaseOnMetMoneyMutation,
  useCreateLinkMutation,
  usePartnerUserQuery,
  useLazyLisitngLinkQuery,
  useGetPartnerDashboardQuery,
  useWillNotSignUpBonusMutation
} = dashboardApiSlice;
