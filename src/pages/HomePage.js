import React, { useEffect, useState } from "react";
import { Home } from "../components/Home/Home";
import ModalAlert from "../components/Home/ModalAlert";
import { asyncCall } from "../utils/reusableFuncVar";
import { echo } from "../utils/webSocket";

const HomePage = () => {

  // alert('page will reload 5 seconds')

  const [show, setShow] = useState(false);
  const [socketTitle, setSocketTitle] = useState(false);

  // //for bidding pause
  // useEffect(() => {
  //   echo.channel("bidding-pause").listen("BiddingPauseEvent", (data) => {
  //     setShow(true);
  //     setSocketTitle('because game bidding is pause')
  //     setInterval(() => {
  //       window.location.reload();
  //     }, 5000);
  //   });
  // }, []);

  // //for game END
  // useEffect(() => {

  //   echo.channel("game-end").listen("GameEndEvent", (data) => {
  //     setShow(true);
  //     setSocketTitle('because game is end')
  //     setInterval(() => {
  //       window.location.reload();
  //     }, 5000);
  //   });
  // }, []);

  // //for new gameStart
  // useEffect(() => {
  //   echo.channel("game-start").listen("GameData", (data) => {
  //     setShow(true);
  //     setSocketTitle('because new game is start')
  //     setInterval(() => {
  //       window.location.reload();
  //     }, 5000);
  //   });

  // }, []);




  // code for scrolling to top and loader
  const [loading, setLoading] = useState(true);
  asyncCall().then((result) => {
    window.scrollTo(0, 0);
    setLoading(result);
  });
  if (loading) return <div className="preloader" id="preloader"></div>;

  return (
    <>
      {show ? <ModalAlert title={socketTitle} box_show={show} /> : null}
      <Home />
    </>
  );
};

export default HomePage;
