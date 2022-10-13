import { createSlice } from '@reduxjs/toolkit'
import { getUserDetailFromLocalSorage } from '../utils/localStorage'

const initialState = {

    // form start
    loginSignupForms: {
        isShowSignupForm: true,
        isShowLoginForm: true,
        isShowOtpForm: false,
        isShowVerifyForm: false,
        isShowForgotPasswordForm: false,
        isShowSetPasswordForm: false,
        isShowTwoFactorAuthForm: false,
    },
    // variables
    loginSignupVar: {
        isShowAccountVerifyMessage: false,
        isUserHasToken: JSON.parse(localStorage.getItem('token')),
        isShowPasswordResetMessage: false,
        userLocalData: getUserDetailFromLocalSorage()
    },
    // fields
    loginSignupFields: {
        name: getUserDetailFromLocalSorage()?.name,
        email: getUserDetailFromLocalSorage()?.email,
        password: '',
        mobile_number: getUserDetailFromLocalSorage()?.mobile_number,
        country: '',
    },

    //fields
    depositFields: {
        order_currency: 'USD',
        order_amount: '',
        coin: 'BTC',
        type:'ERC20'
    },
    email: null,
    autoDetectCountry: ""
}

export const loginSignupSlice = createSlice({
    name: 'loginSignupSlice',
    initialState,
    reducers: {

        setForms: (state, action) => {
            state.loginSignupForms = {
                ...state.loginSignupForms,
                isShowSignupForm: action.payload.isShowSignupForm,
                isShowLoginForm: action.payload.isShowLoginForm,
                isShowOtpForm: action.payload.isShowOtpForm,
                isShowVerifyForm: action.payload.isShowVerifyForm,
                isShowForgotPasswordForm: action.payload.isShowForgotPasswordForm,
                isShowSetPasswordForm: action.payload.isShowSetPasswordForm,
                isShowTwoFactorAuthForm: action.payload.isShowTwoFactorAuthForm,
            }

        },
        setEmailAndPassword: (state, action) => {
            state.loginSignupFields = {
                ...state.loginSignupFields,
                email: action.payload.email,
                password: action.payload.password
            }
        },

        setSignupFields: (state, action) => {

            state.loginSignupFields = {
                ...state.loginSignupFields,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                mobile_number: action.payload.mobile_number,
                country: action.payload.country,
            }

        },
        setloginSignupVar: (state, action) => {
            state.loginSignupVar = {
                ...state.loginSignupVar,
                isUserHasToken: action.payload.isUserHasToken,
                isShowAccountVerifyMessage: action.payload.isShowAccountVerifyMessage,
                isShowPasswordResetMessage: action.payload.isShowPasswordResetMessage,

            }

        },
        setDepositFields: (state, action) => {
            state.depositFields = {
                ...state.depositFields,
                order_currency: action.payload.order_currency,
                order_amount: action.payload.order_amount,
                coin: action.payload.coin,
                type: action.payload.type,
            }

        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setAutoDetectCountry: (state, action) => {
            state.autoDetectCountry = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setForms,
    setEmailAndPassword, setSignupFields,
    setloginSignupVar,
    setDepositFields,
    setEmail,
    setAutoDetectCountry

} = loginSignupSlice.actions
export default loginSignupSlice.reducer