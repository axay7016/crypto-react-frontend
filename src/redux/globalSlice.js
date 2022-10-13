import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errorMessages: {},
    successMessages: {},
    apiError: {
        isShowError: "",
        statusCode: ""
    }
}

const reducers = {
    setErrorMessage: (state, action) => {
        state.errorMessages = action.payload
    },
    setSuccessMessage: (state, action) => {
        state.successMessages = action.payload
    },
    setApiError: (state, action) => {
        state.apiError = action.payload
    },

}
export const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: reducers,
})

// Action creators are generated for each case reducer function
export const { setErrorMessage, setSuccessMessage, setApiError } = globalSlice.actions
export default globalSlice.reducer