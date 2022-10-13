import React from 'react'
import Timer from '../reusable/reusableComponent/Timer'
const CryptoGamesHeader = ({ gameCoin, gameCurrentPrice, coinId, handleGraphButton, gameHours, gameMinutes, gameSeconds, icon, colorStatus = null, gameDuration }) => {

    return (
        <div className="head-area d-flex justify-content-between">
            <div className="cmn-btn cryptoGamesHeader-btn">
                <img src={`assets/images/${icon}`} alt="icon" />&nbsp;&nbsp;
                <span>{gameCoin}</span>&nbsp; - &nbsp;
                <span className={`game-current-price ${colorStatus ? "priceHigh" : "priceLow"}`}>&nbsp;{gameCurrentPrice}</span>
            </div>

            <div className='d-flex '>
                <div className='' id={`end-time-${coinId}`}>
                    <Timer
                        hours={gameHours}
                        minutes={gameMinutes}
                        seconds={gameSeconds}
                        gameDuration={gameDuration}

                    />
                </div>
                <div className=" text-white ms-2" onClick={() => {
                    handleGraphButton(coinId)
                }} >
                    <i className="fas fa-chart-bar chart-icon" role="button"></i>
                </div>
            </div>

        </div>
    )
}
export default CryptoGamesHeader