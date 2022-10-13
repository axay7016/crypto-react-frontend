import React from 'react'
import { useSelector } from 'react-redux';

const CryptoGamesFooter = ({ handleAboveMidLow, gameUniqueId, gameCoinId, gameName,
    gameId, gameHighOdd, gameMidOdd, gameLowOdd }) => {


    const { isUserHasToken } = useSelector((state) => state.loginSignupReducer.loginSignupVar);

    return (
        <>
            <div className=" d-flex justify-content-around">
                <button type="button" className="cmn-btn "
                    data-bs-toggle="modal"
                    data-bs-target={isUserHasToken ? "#betpop-up" : "#loginMod"}
                    id='low'
                    onClick={(event) => handleAboveMidLow(
                        event,
                        gameUniqueId,
                        gameId,
                        gameName,
                        gameLowOdd,
                        gameCoinId
                    )}
                >Below</button>

                <button type="button" className="cmn-btn "
                    data-bs-toggle="modal"
                    data-bs-target={isUserHasToken ? "#betpop-up" : "#loginMod"}
                    id='mid'
                    onClick={(event) => handleAboveMidLow(
                        event,
                        gameUniqueId,
                        gameId,
                        gameName,
                        gameMidOdd,
                        gameCoinId
                    )}
                >Mid</button>
                <button type="button" className="cmn-btn "
                    data-bs-toggle="modal"
                    data-bs-target={isUserHasToken ? "#betpop-up" : "#loginMod"}
                    id='high'
                    onClick={(event) => handleAboveMidLow(
                        event,
                        gameUniqueId,
                        gameId,
                        gameName,
                        gameHighOdd,
                        gameCoinId
                    )}
                >Above</button>
            </div>
            <div className='d-flex justify-content-end single-item '>
                <strong className='text-white p-3'>Game ID : {gameUniqueId}</strong>
            </div>
        </>

    )
}

export default CryptoGamesFooter