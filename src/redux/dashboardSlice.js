import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // variables
    dashboardTab: "showDashboard"
}
export const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.dashboardTab = action.payload
        },
    },
})
export const { setTab } = dashboardSlice.actions
export default dashboardSlice.reducer