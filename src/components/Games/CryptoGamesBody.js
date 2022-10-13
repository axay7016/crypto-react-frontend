import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useSelector } from "react-redux";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CryptoGamesBody = ({
  gameId,
  gameUniqueId,
  gameName,
  gameCoinId,
  gameHighRange,
  gameMidRange,
  gameLowRange,
  gameHighOdd,
  gameMidOdd,
  gameLowOdd,
  handleAboveMidLow,
}) => {
  const { isUserHasToken } = useSelector((state) => state.loginSignupReducer.loginSignupVar);
  const [Decimal, setDecimal] = useState(false);

  useEffect(() => {
    async function makeRequest() {
      $("div.above-circle").addClass("above-socket");
      $("div.mid-circle").addClass("mid-socket");
      $("div.below-circle").addClass("below-socket");
      await delay(300);

      $("div").removeClass("above-socket");
      $("div").removeClass("mid-socket");
      $("div").removeClass("below-socket");
    }
    makeRequest();
  });

  useEffect(()=>{
    if(Math.round(gameLowRange) == 0){
      setDecimal(true)
    }
    
  },[])
  return (
    <div>
      <div className="d-flex justify-content-around">
        <span className="bull-game">
          <span className="arrow arrow-down"></span>
          <span className="text-white mobile-width">{`≤ ${gameLowRange}`}</span>
        </span>
        <span className="bull-game">
          <span className="arrow arrow-right"></span>
          <span className={Decimal ? 'text-white mobile-width decimal-value' : 'text-white mobile-width'}>{`${gameMidRange}`}</span>
        </span>
        <span className="bull-game">
          <span className="arrow arrow-up"></span>
          <span className="text-white mobile-width">{`≥ ${gameHighRange} `}</span>
        </span>
      </div>
      <div className="d-flex justify-content-around ">
        <div className="numberCircle below-circle"
          role={'button'}
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
        >{`${gameLowOdd}x`}</div>
        <div className="vertical-line"></div>
        <div className="numberCircle mid-circle"
          role={'button'}
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
        >{`${gameMidOdd}x`}</div>
        <div className="vertical-line"></div>
        <div className="numberCircle above-circle"
          role={'button'}
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
        >{`${gameHighOdd}x`}</div>

      </div>
    </div>
  );
};
export default CryptoGamesBody;