import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLazyGetHomePageGamesQuery } from "../../servicesRtkQuery/publicApi";
import { gameOddWebSocket } from "../../utils/webSocket";
import Loader from "../reusable/reusableComponent/Loader";
import Timer from "../reusable/reusableComponent/Timer";
import { echo } from "../../utils/webSocket";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BetThisGame = () => {
  const { t } = useTranslation(["common"]);
  const [Static, setStatic] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    gameOddWebSocket();
  }, []);
  //for bidding pause
  useEffect(() => {
    echo.channel("bidding-pause").listen("BiddingPauseEvent", (bidding_pause) => {
      $(`.${bidding_pause.data.game_id}`).remove();
    });
  }, []);

  //for game END
  useEffect(() => {
    echo.channel("game-end").listen("GameEndEvent", (game_end_data) => {
      $(`.${game_end_data.data.game_id}`).remove();
    });
  }, []);

  //for new gameStart
  useEffect(() => {
    echo.channel("game-start").listen("GameData", async (game_start) => {
      setStatic(!Static)
      trigger()
    });
  }, []);

  const websocketData = useSelector(
    (state) => state.webSocketGameReducer.gameDataSocket
  );
  const socketData = websocketData.data;

  const [trigger, result] = useLazyGetHomePageGamesQuery();
  const { isSuccess, isLoading, isError, error } = result;

  useEffect(() => {
    trigger();
  }, []);


  const [newGames, setNewGames] = useState([]);
  const [oldGameData, setoldGameData] = useState([]);
  const [oldGameOddData, setoldGameOddData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
     
      let games = result?.data?.results;
      //its returning array of milliseconds
      let remainingTimeForGame = games.map((game) => {
        let time = new Date(game.full_end_time.replace(/\s/, "T"));
        let timeDiff = time.getTime() - new Date().getTime();
        return timeDiff;
      });
      // convert miliseconds to hours minutes and seconds
      const remainingTimeForGameInHours = remainingTimeForGame.map((time) => {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let seconds = Math.floor((time / 1000) % 60);
        return { hours, minutes, seconds };
      });

      // extends game with remaining time
      games = games.map((game, index) => {
        return {
          ...game,
          hours: remainingTimeForGameInHours[index].hours,
          minutes: remainingTimeForGameInHours[index].minutes,
          seconds: remainingTimeForGameInHours[index].seconds,
        };
      });
      setNewGames(games);
    }
  }, [result?.data]);




  const getCurrentGameData = (value) => {
    // console.log('getCurrentGameData', value)
    let game_data = socketData?.filter((item) => item.game_id === value);
    let pre_data = oldGameOddData?.filter((item) => item.game_id === value);
    game_data = game_data && game_data[0] ? game_data[0] : [];
    let priceData = {
      pre_price: pre_data && pre_data[0]?.current_price,
      current_price: game_data.current_price,
      socket_data: game_data,
    };
    return priceData;
  };

  useEffect(() => {
    calGameOldData(oldGameData, socketData);
    async function makeRequest() {
      $("span.price-color").addClass("priceHigh");
      $("span.price-color").addClass("priceLow");

      await delay(300);

      $("span.price-color").removeClass("priceHigh");
      $("span.price-color").removeClass("priceLow");
    }

    makeRequest()

  }, [socketData]);

  const calGameOldData = (oldGameRecord, newGameRecord) => {
    setoldGameOddData(oldGameRecord);
    setoldGameData(newGameRecord);
  };

  const redirect = () => {
    navigate('/crypto-games');
  }

  return (
    <section className="bet-this-game">
      <div className="overlay ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-header text-center">
                <h5 className="sub-title">{t("makePrediction")}</h5>
                <h2 className="title">Choose and Play</h2>
                <h2 className="title">The Crypto Game</h2>
                <p>{t("useThePower")}</p>
              </div>
            </div>
          </div>
          <div className="row cus-mar">
            {isError && <div>{error.toString()}</div>}
            {isLoading && <Loader />}
            {newGames.length > 0 &&
              newGames?.slice(0, 3)?.map((game) => {

                let game_data = getCurrentGameData(game.id);
                return (
                  <div className="col-lg-4" key={game.id}>
                    <div className="single-area game-screen" onClick={redirect}>
                      <div className={game.id}>
                        <div className="head-area d-flex align-items-center">
                          <img
                            className="pe-2"
                            src={`assets/images/${game.icon}`}
                            alt={"gameicon"}
                          />
                          <span
                            className={`price-color ${game_data.pre_price?.replace(/,/g, "") <
                              game_data.current_price?.replace(/,/g, "")
                              ? "priceHigh"
                              : game_data.pre_price?.replace(/,/g, "") >
                              game_data.current_price?.replace(/,/g, "") ? "priceLow" : ''}`
                            }
                          >
                            {/* {console.log(game,game_data.current_price)} */}
                            {game_data.current_price == undefined ? game.price_at_time_of_game_start : game_data.current_price}{" "}
                          </span>
                          <div className="countdown d-flex align-items-center justify-content-center ps-0 pe-0">
                            <Timer
                              hours={game.hours}
                              minutes={game.minutes}
                              seconds={game.seconds}
                              gameDuration={game.duration}
                            />
                          </div>
                          <div className="status_live mx-2">live</div>
                        </div>
                        <div className="d-flex align-items-center m-3 justify-content-end"></div>
                        <div className="main-content mb-0 mx-0 pb-3">
                          <div className="team-single">
                            <h4>{game.coin_name}</h4>
                          </div>
                          <div className="mid-area button_section col-4">
                            <Link
                              to="/crypto-games"
                              className="btn btn-primary "
                            >
                              Play now
                            </Link>
                          </div>
                          <div className="potenial_text">
                            <h6 className="price_section">
                              {game_data?.socket_data?.highest_odd
                                ? game_data?.socket_data?.highest_odd
                                : game.high_odd}
                              x
                            </h6>
                            <span className="potentials_roi">ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="bottom-area mt-30">
                {newGames.length > 0 ? (
                  <span className="btn-border">
                    <Link to="/crypto-games" className="cmn-btn">
                      {t("browseMore")}
                    </Link>
                  </span>
                ) : (
                  <span className="btn-border cmn-btn ">No game is found</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BetThisGame;