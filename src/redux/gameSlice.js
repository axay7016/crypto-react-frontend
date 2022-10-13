import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // form start
    gameData: {
        game_unique_id: "",
        game_name: "",
        game_id: "",
        game_odd: "",
        game_coin_id: "",
        high_mid_low: "",
    },
    allCoins: [],
    balanceCoinData: {
        coin_id: "",
        balance: "",
        coin: "",
        min_stake: "",
        max_stake: "",
        name: "",
        icon: ""
    },
    isDefaultCurrencySet: true
}
export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
        setGameAndCoin: (state, action) => {
            state.gameData = {
                ...state.gameData,
                game_id: action.payload.game_id,
                game_unique_id: action.payload.game_unique_id,
                game_name: action.payload.game_name,
                game_odd: action.payload.game_odd,
                game_coin_id: action.payload.game_coin_id,
                high_mid_low: action.payload.high_mid_low,
            }
        },
        setBalanceCoinData: (state, action) => {
            state.balanceCoinData = {
                ...state.balanceCoinData,
                coin_id: action.payload.coin_id,
                balance: action.payload.balance,
                coin: action.payload.coin,
                min_stake: action.payload.min_stake,
                max_stake: action.payload.max_stake,
                name: action.payload.name,
                icon: action.payload.icon

            }
        },
        setAllCoins: (state, action) => {
            state.allCoins = action.payload
        },
        setIsDefaultCurrencySet: (state, action) => {
            state.isDefaultCurrencySet = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setGameAndCoin,
    setBalanceCoinData,
    setAllCoins,
    setIsDefaultCurrencySet
} = gameSlice.actions
export default gameSlice.reducer