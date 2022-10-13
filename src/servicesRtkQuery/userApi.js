import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setApiError } from '../redux/globalSlice';

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

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        changePassword: builder.query({
            query: (payload) => ({
                url: 'change-password',
                method: 'POST',
                body: payload
            })
        }),
        logout: builder.query({
            query: () => ({
                url: 'logout',
                method: 'GET',
            })
        }),
        editProfile: builder.query({
            query: (payload) => ({
                url: 'user-update',
                method: 'PUT',
                body: payload
            })
        }),
    })
})

export const { useLazyChangePasswordQuery, useLazyLogoutQuery, useLazyEditProfileQuery } = userApiSlice