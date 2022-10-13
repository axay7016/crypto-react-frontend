// this api's dont need token

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setApiError } from '../redux/globalSlice';

let time_zone = (new Date().toString().substring(new Date().toString().indexOf('+') + 0)).slice(0, 5);
time_zone = time_zone.substring(0, 3) + ':' + time_zone.substring(3);


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
});
const baseQueryMiddleware = async (args, api, extraOptions) => {
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
export const publicApiSlice = createApi({
    reducerPath: 'publicApi',
    baseQuery: baseQueryMiddleware,
    endpoints: builder => ({
        createContact: builder.mutation({
            query: (payload) => ({
                url: 'create-contact',
                method: 'POST',
                body: payload
            })
        }),
        addSubcribe: builder.mutation({
            query: (payload) => ({
                url: 'add-subscribe',
                method: 'POST',
                body: payload
            })
        }),
        login: builder.query({
            query: (payload) => ({
                url: 'login',
                method: 'POST',
                body: payload
            })
        }),
        socialLogin: builder.query({
            query: (payload) => ({
                url: 'login/google',
                method: 'POST',
                body: payload
            })
        }),
        register: builder.query({
            query: (payload) => ({
                url: 'register',
                method: 'POST',
                body: payload
            })
        }),
        verifyOtp: builder.query({
            query: (payload) => ({
                url: 'verify',
                method: 'POST',
                body: payload
            })
        }),
        twoFactorAuthOtp: builder.query({
            query: (payload) => ({
                url: 'verify-account',
                method: 'POST',
                body: payload
            }),
        }),
        //this api use for sendinh and resending otp
        sendOtp: builder.query({
            query: (payload) => ({
                url: 'resend-otp',
                method: 'POST',
                body: payload
            })
        }),
        forgotPassword: builder.query({
            query: (payload) => ({
                url: 'forgot-password',
                method: 'POST',
                body: payload
            })
        }),
        setNewPassword: builder.query({
            query: (payload) => ({
                url: 'set-password',
                method: 'POST',
                body: payload
            })
        }),
        getHomePageGames: builder.query({
            query: () => ({
                url: 'frontend/game',
                method: 'GET',
                params: { time_zone: time_zone },
            })

        }),
        getAllGames: builder.query({
            query: (payload) => ({ url: 'frontend/all-game', method: 'POST', body: { ...payload, time_zone: time_zone } })
        }),
        getCoins: builder.query({
            query: () => ({ url: 'frontend/coin', method: 'GET' })
        }),
        checkPartnerUrl: builder.mutation({
            query: (payload) => ({
                url: 'partner/check-user-come-from-partner-url',
                method: 'POST',
                body: payload
            })
        }),
        // get country api

    })
})

export const {
    useCreateContactMutation, useAddSubcribeMutation,
    useLazyLoginQuery, useLazySocialLoginQuery, useLazyRegisterQuery, useLazyVerifyOtpQuery, useLazySendOtpQuery, useLazyTwoFactorAuthOtpQuery,
    useLazyForgotPasswordQuery, useLazySetNewPasswordQuery,
    useLazyGetHomePageGamesQuery, useLazyGetAllGamesQuery, useGetCoinsQuery, useCheckPartnerUrlMutation,
} = publicApiSlice