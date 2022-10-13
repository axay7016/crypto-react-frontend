import { configureStore } from '@reduxjs/toolkit'
import loginSignupReducer from './loginSignupSlice'
import globalReducer from './globalSlice'
import dashboardReducer from './dashboardSlice'
import gameReducer from './gameSlice'
import webSocketGameReducer from './webSocketGameSlice'
import { gameApiSlice } from './../servicesRtkQuery/gamesApi'
import { dashboardApiSlice } from './../servicesRtkQuery/dashboardApi'
import { publicApiSlice } from './../servicesRtkQuery/publicApi'
import { userApiSlice } from './../servicesRtkQuery/userApi'
export const store = configureStore({
    reducer: {
        loginSignupReducer,
        globalReducer,
        dashboardReducer,
        gameReducer,
        webSocketGameReducer,
        [gameApiSlice.reducerPath]: gameApiSlice.reducer,
        [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
        [publicApiSlice.reducerPath]: publicApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            gameApiSlice.middleware,
            dashboardApiSlice.middleware,
            publicApiSlice.middleware,
            userApiSlice.middleware,
        ),
})

