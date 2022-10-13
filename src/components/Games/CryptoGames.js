import React, { useEffect, useState } from "react";
import { asyncCall } from "../../utils/reusableFuncVar";
import CryptoCoins from "./CryptoCoins";
import BettingModal from "./BettingModal";
import { setGameAndCoin } from "../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import CryptoGamesHeader from "./CryptoGamesHeader";
import CryptoGamesBody from "./CryptoGamesBody";
import CryptoGamesFooter from "./CryptoGamesFooter";
import { echo, gameOddWebSocket } from "../../utils/webSocket";
import Tradingview from "../reusable/reusableComponent/Tradingview";
import {
  useGetCoinsQuery,
  useLazyGetAllGamesQuery,
} from "../../servicesRtkQuery/publicApi";
import { filterTableData } from "../../utils/filterTableData";
import CryptoGamesBanner from "./CryptoGamesBanner";
import Loader from "../reusable/reusableComponent/Loader";
import Durations from "./Durations";
import ResultPending from "./ResultPending";
import $ from "jquery";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CryptoGames = () => {
  //intial declaration
  const { isUserHasToken } = useSelector(
    (state) => state.loginSignupReducer.loginSignupVar
  );

  useEffect(() => {
    gameOddWebSocket();
  }, []);
  useEffect(() => {
    echo
      .channel("bidding-pause")
      .listen("BiddingPauseEvent", (bidding_pause) => {
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
      trigger();
    });
  }, []);

  // ---------------------------------------------------------------
  // code for getting sidebar coins
  const { data: coinData } = useGetCoinsQuery();
  // ---------------------------------------------------------------
  const [filterColumns, setFilterColumns] = useState({
    coin_id: [],
    duration: [],
    result_pending: 0,
  });

  const [trigger, result] = useLazyGetAllGamesQuery();
  const { isSuccess, isLoading, isFetching, isError, error } = result;

  let gamesResponse = [];
  if (isSuccess) {
    gamesResponse = result.data.results.games;
  }

  const handleFilter = (event) => {
    const { id, checked, name } = event.target;
    if (name === "coins") {
      if (checked === true) {
        setFilterColumns({
          ...filterColumns,
          coin_id: [...filterColumns.coin_id, id],
        });
      } else {
        setFilterColumns({
          ...filterColumns,
          coin_id: filterColumns.coin_id.filter((item) => item !== id),
        });
      }
    } else if (name === "resultPending") {
      if (checked === true) {
        setFilterColumns({ ...filterColumns, result_pending: "1" });
      } else {
        setFilterColumns({ ...filterColumns, result_pending: "0" });
      }
    } else if (name === "duration") {
      if (checked === true) {
        setFilterColumns({
          ...filterColumns,
          duration: [...filterColumns.duration, id],
        });
      } else {
        setFilterColumns({
          ...filterColumns,
          duration: filterColumns.duration.filter((item) => item !== id),
        });
      }
    }
  };
  useEffect(() => {
    (async function () {
      await filterTableData(trigger, filterColumns);
    })();
  }, [filterColumns]);

  const [newGames, setNewGames] = useState([]);
  useEffect(() => {
    if (isSuccess && !isFetching) {
      if (gamesResponse?.length > 0) {
        let remainingTimeForGame = gamesResponse.map((game) => {
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
        // add hourse minute and seconds in newGames object
        let newGames = gamesResponse.map((game, index) => {
          return {
            ...game,
            hours: remainingTimeForGameInHours[index].hours,
            minutes: remainingTimeForGameInHours[index].minutes,
            seconds: remainingTimeForGameInHours[index].seconds,
          };
        });
        if (gamesResponse.length > 0) {
          setNewGames(newGames);
        }
      } else {
        setNewGames([]);
      }
    }
  }, [isSuccess, isError, isFetching, gamesResponse]);

  // ---------------------------------------------------------------
  //show modal alert and reload page after 5 seconds

  const [oldGameData, setoldGameData] = useState([]);
  const [oldGameOddData, setoldGameOddData] = useState([]);

  //  redux hooks
  const dispatch = useDispatch();

  // this data
  const data = useSelector(
    (state) => state.webSocketGameReducer.gameDataSocket
  );
  const socketData = data.data;
  // ---------------------------------------------------------------

  const handleAboveMidLow = (
    event,
    gameUniqueId,
    gameId,
    gameName,
    gameOdd,
    gameCoinId
  ) => {
    dispatch(
      setGameAndCoin({
        game_unique_id: gameUniqueId,
        game_name: gameName,
        game_odd: gameOdd,
        game_id: gameId,
        high_mid_low: event.target.id,
        game_coin_id: gameCoinId,
      })
    );
  };

  const getCurrentGameData = (value) => {
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

  //-----------------------------------------------------------------------

  useEffect(() => {
    setoldGameData([]);
    setoldGameOddData([]);
  }, []);

  useEffect(() => {
    calGameOldData(oldGameData, socketData);
    async function makeRequest() {
      $("span.game-current-price").addClass("priceHigh");
      $("span.game-current-price").addClass("priceLow");

      await delay(300);

      $("span.game-current-price").removeClass("priceHigh");
      $("span.game-current-price").removeClass("priceLow");
    }

    makeRequest()
  }, [socketData]);

  const calGameOldData = async (oldGameRecord, newGameRecord) => {
    await setoldGameData(newGameRecord);
    await setoldGameOddData(oldGameData);
  };

  //tradingview  modal
  const [coinId, setCoinId] = useState(0);
  const handleGraphButton = (coinId) => {
    setCoinId(coinId);
  };
  const handleModalClose = () => {
    setCoinId(0);
  };
  // this code for loading when game screen is loaded first time
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    asyncCall().then((result) => {
      window.scrollTo(0, 100);
      setLoading(result);
    });
  }, []);
  if (loading) return <div className="preloader" id="preloader"></div>;
  //----------------------------------------------------------------------------------------------
  return (
    <>
      <BettingModal />
      <CryptoGamesBanner />
      <section className="bet-this-game all-soccer-bets bets-2">
        <div className="overlay">
          <div className="container">
            <div className=" mb-40">
              <div className=" text-center">
                <span className="text-succes display-4  fw-bolder">Bull</span>
                &nbsp;&nbsp;&nbsp;
                <span className="text-white display-6 fw-bolder">vs</span>
                &nbsp;&nbsp;&nbsp;
                <span className="text-danger display-4 fw-bolder">Bear</span>
              </div>
            </div>
            <div className="row cus-mar">
              <div className="col-3">
                <div className="sidebar position-sticky top-0">
                  <div className="single-sidebar durection ">
                    <h5 className="title-area m-none">Duration</h5>
                    <Durations handleCheckBox={handleFilter} />
                  </div>
                  <div className="single-sidebar">
                    <h5 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-cryptocoin-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        Crypto coins
                      </button>
                    </h5>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                    >
                      <div className="accordion-body">
                        <CryptoCoins
                          coins={coinData?.results}
                          handleCheckBox={handleFilter}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="single-sidebar">
                    <div className="single-item ">
                      <label className="checkbox-single d-flex align-items-center">
                        <span className="left-area">
                          <span className="checkbox-area d-flex">
                            <input
                              name="resultPending"
                              type="checkbox"
                              onChange={handleFilter}
                            />
                            <span className="checkmark"></span>
                          </span>
                        </span>
                        <span className="item-title d-flex align-items-center">
                          <span>Result pending</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9">
                {isLoading || isFetching ? (
                  <Loader />
                ) : newGames.length === 0 ? (
                  <strong className="text-white">No games found</strong>
                ) : newGames.length > 0 &&
                  // code for result pending
                  filterColumns.result_pending == 1 ? (

                  <ResultPending games={newGames} />
                ) : (
                  // code for not result pending
                  newGames?.map((game) => {
                    if (Math.sign(game.hours) != -1) {
                      let game_data = getCurrentGameData(
                        Number(game.id),
                        Number(game.price_at_time_of_game_start)
                      )
                      return (
                        <div className="single-area" key={game.id}>
                          {/* {!Static ? ( */}
                          <div className={game.id}>
                            <CryptoGamesHeader
                              handleGraphButton={handleGraphButton}
                              gameCurrentPrice={
                                game_data?.current_price
                                  ? game_data?.current_price
                                  : Number(game.price_at_time_of_game_start)
                              }
                              colorStatus={
                                game_data.pre_price?.replace(/,/g, "") <
                                  game_data?.current_price?.replace(/,/g, "")
                                  ? true
                                  : false
                              }
                              coinId={game.coin_id}
                              gameCoin={game.coin_name}
                              gameHours={game.hours}
                              gameMinutes={game.minutes}
                              gameSeconds={game.seconds}
                              icon={game.icon}
                              gameDuration={game.duration}
                            />
                            <CryptoGamesBody
                              handleAboveMidLow={handleAboveMidLow}
                              gameUniqueId={game.game_unique_id}
                              gameName={game.coin_name}
                              gameCoinId={game.coin_id}
                              gameId={game.id}
                              gameHighRange={game.high_range}
                              gameMidRange={game.mid_range}
                              gameLowRange={game.low_range}
                              gameHighOdd={
                                game_data?.socket_data?.high_odd
                                  ? game_data?.socket_data?.high_odd
                                  : game.high_odd
                              }
                              gameMidOdd={
                                game_data?.socket_data?.mid_odd
                                  ? game_data?.socket_data?.mid_odd
                                  : game.mid_odd
                              }
                              gameLowOdd={
                                game_data?.socket_data?.low_odd
                                  ? game_data?.socket_data?.low_odd
                                  : game.low_odd
                              }
                            />
                            <CryptoGamesFooter
                              handleAboveMidLow={handleAboveMidLow}
                              gameUniqueId={game.game_unique_id}
                              gameName={game.coin_name}
                              gameCoinId={game.coin_id}
                              gameId={game.id}
                              gameHighOdd={
                                game_data?.socket_data?.high_odd
                                  ? game_data?.socket_data?.high_odd
                                  : game.high_odd
                              }
                              gameMidOdd={
                                game_data?.socket_data?.mid_odd
                                  ? game_data?.socket_data?.mid_odd
                                  : game.mid_odd
                              }
                              gameLowOdd={
                                game_data?.socket_data?.low_odd
                                  ? game_data?.socket_data?.low_odd
                                  : game.low_odd
                              }
                            />
                          </div>
                        </div>
                      );
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* coinId */}
      {coinId ? (
        <Tradingview handleModalClose={handleModalClose} symbol={coinId} />
      ) : (
        isUserHasToken && <BettingModal />
      )}
    </>
  );
};
export default CryptoGames;
