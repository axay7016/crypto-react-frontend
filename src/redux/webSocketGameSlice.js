import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // form start

    gameDataSocket: {},
}
export const webSocketGameSlice = createSlice({
    name: 'webSocketGameSlice',
    initialState,
    reducers: {
        setGameDataSocket: (state, action) => {
            state.gameDataSocket = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setGameDataSocket
} = webSocketGameSlice.actions
export default webSocketGameSlice.reducer