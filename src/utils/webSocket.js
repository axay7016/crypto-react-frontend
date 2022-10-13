import { store } from '../redux/store';

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { setGameDataSocket } from "../redux/webSocketGameSlice";
import { getUserDetailFromLocalSorage } from "./localStorage";

const { dispatch } = store

export const echo = new Echo({
    broadcaster: process.env.REACT_APP_BROADCASTER,
    key: process.env.REACT_APP_WS_KEY,
    wsHost: process.env.REACT_APP_WS_HOST,
    wsPort: process.env.REACT_APP_WS_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
});

export const gameOddWebSocket = () => {
    echo.channel("game-odd").listen("GameOddEvent", (data) => {
        dispatch(setGameDataSocket(data))
    });
}
export const logoutWebSocket = (userId) => {
    const { id } = getUserDetailFromLocalSorage()
    if (userId === id) {
        window.location.href = "/";
    }
}
