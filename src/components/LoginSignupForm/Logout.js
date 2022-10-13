import React, { useEffect, useState, useRef } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setTab } from "../../redux/dashboardSlice";
import { setAllCoins, setBalanceCoinData, setIsDefaultCurrencySet } from "../../redux/gameSlice";
import { setloginSignupVar } from "../../redux/loginSignupSlice";

import { useLazyGetBalanceCoinsQuery, useSetDefaultCurrencyApiMutation, } from "../../servicesRtkQuery/gamesApi";
import { useLazyLogoutQuery } from "../../servicesRtkQuery/userApi";
import {
  getUserCurrencyFromLocalSorage,
  getUserDetailFromLocalSorage,
  setUserCurrencyInLocalStorage,
} from "../../utils/localStorage";
import { echo, logoutWebSocket } from "../../utils/webSocket";
import Loader from "../reusable/reusableComponent/Loader";

const Logout = ({ setIsShowToggler }) => {
  // logout code

  const [triggerLogout, resultLogout] = useLazyLogoutQuery();
  const {
    isSuccess: isSuccessLogout,
    isFetching: isFetchingLogout,
    isError: isErrorLogout,
    error: errorLogout,
  } = resultLogout;

  useEffect(() => {
    if (isSuccessLogout && !isFetchingLogout) {
      dispatch(setloginSignupVar({ isUserHasToken: null }));
      localStorage.removeItem("token");
    }
  }, [isSuccessLogout, isFetchingLogout]);

  useEffect(() => {
    if (isErrorLogout && !isFetchingLogout) {
      alert(errorLogout.data.message);
    }
  }, [isErrorLogout, isFetchingLogout]);
  const handleLogout = async () => {
    setIsShowToggler(true)

    triggerLogout();
  };
  useEffect(() => {
    echo.channel("logout").listen("LogOutEvent", (data) => {
      logoutWebSocket(data.data.id);
    });
  }, []);
  //----------------------------------------------------------------------------------------------------------------------
  // this code for click on profile div open and close
  const [isActiveUserContent, setActiveUserContent] = useState(false);

  const profileDivRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
  }, []);
  const handleOutsideClick = (e) => {
    if (profileDivRef && profileDivRef?.current?.contains(e.target)) {
      setActiveUserContent(true);
    } else {
      setActiveUserContent(false);
    }
  };
  //---------------------------------------------------------------------------------
  const handleToggler = () => {
    setIsShowToggler(true)
  }
  //  web socket code
  useEffect(() => {
    echo.channel('user-balance').listen("UserBaLanaceEvent", (data) => {
      const user_details = getUserDetailFromLocalSorage();
      if (data.data.user_id == user_details.id) {
        getUserBalance()
      }
    });
  }, [])

  /////////////////////////

  const dispatch = useDispatch();
  const [balanceCoins, setBalanceCoins] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState([]);

  const { name, created_at } = getUserDetailFromLocalSorage();
  const joined_at = created_at.substring(3, 11);

  const [setDefaultCurrencyApi, { data, isSuccess, isLoading }] = useSetDefaultCurrencyApiMutation()
  const userCoinRef = useRef()
  const handleCoinChange = (e) => {
    setIsShowToggler(true)
    const coinId = userCoinRef.current.value
    const coinData = balanceCoins.find((coin) => coin.coin_id == coinId);
    dispatch(setBalanceCoinData(coinData));
    setDefaultCurrencyApi({ default_currency: coinId })

  };
  useEffect(() => {
    dispatch(setIsDefaultCurrencySet(isLoading))
    if (isSuccess && !isLoading) {
      setUserCurrencyInLocalStorage({
        defaultCurrencyId: data.results.data.default_currency,
        defaultCurrencyName: data.results.data.default_coin_name,
      });
    }
  }, [isSuccess, isLoading])

  useEffect(() => {
    getUserBalance();
  }, []);

  const [triggerUserBalance, resultUserBalance] = useLazyGetBalanceCoinsQuery();
  const {
    data: dataUserBalance,
    isSuccess: isSuccessUserBalance,
    isFetching: isFetchingUserBalance,
    isError: isErrorUserBalance,
    error: errorUserBalance,
  } = resultUserBalance;
  const { defaultCurrencyId, defaultCurrencyName } = getUserCurrencyFromLocalSorage();
  const getUserBalance = () => {
    if (defaultCurrencyId) {
      setDefaultCurrency([defaultCurrencyId, defaultCurrencyName]);
    }
    triggerUserBalance()
  };
  useEffect(() => {
    if (isSuccessUserBalance && !isFetchingUserBalance && dataUserBalance.length > 0) {
      setBalanceCoins(dataUserBalance);
      const coinData = dataUserBalance.find(
        (coin) => coin.coin_id === defaultCurrencyId
      );
      dispatch(setBalanceCoinData(coinData));
      dispatch(setAllCoins(dataUserBalance));
    }
    if (isErrorUserBalance && !isFetchingUserBalance) {
      alert('something went wrong with user balance')
    }

  }, [isSuccessUserBalance, isFetchingUserBalance, isErrorUserBalance])

  return (
    <>
      <div className="right-area header-action d-flex align-items-center max-un">
        <ul className="navbar-nav me-0">
          <Nav className="navbar navbar-expand-lg navbar-light">
          <li className="nav-item">
        <NavLink
          activeclassname="active"
          to="/deposit"
          className="nav-link "
          aria-current="page"
          onClick={handleToggler}
        >
          Deposit
        </NavLink>
      </li>
            <li className="nav-item">
              <NavLink
                activeclassname="active"
                to="/dashboardContainer"
                className="nav-link "
                aria-current="page"
                onClick={handleToggler}
              >
                Dashboard
              </NavLink>
            </li>
          </Nav>
        </ul>
        <div className="single-item select ms-0">
          {balanceCoins?.length > 0 ? (
            <select
              onChange={handleCoinChange}
              className="header-balance-select"
              name="coinName"
              ref={userCoinRef}

            >
              {balanceCoins?.map((coin) => {
                return defaultCurrency[1] === coin.name ? (
                  <option key={coin.coin_id} value={coin.coin_id} selected>
                    {coin.name} {coin.balance}
                  </option>
                ) : (
                  <option key={coin.coin_id} value={coin.coin_id}>
                    {coin.name} {coin.balance}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}

          {/* <div className="single-item user-area  ms-0" >   */}
          <div className="single-item user-area  ms-0" ref={profileDivRef}>
            <div className="user-btn d-flex align-items-center ">
              <span className="user-profile">
                <img
                  className=""
                  src="/assets/images/dashboard-profile-1.png"
                  alt="icon"
                  width={42}
                  height={42}
                />
              </span>
              <span className="name-area">{name?.split(" ")[0]}</span>
              <i className="icon-c-down-arrow"></i>
            </div>
            <div
              className={
                isActiveUserContent
                  ? " main-area user-content active"
                  : " main-area user-content"
              }
            >
              <div className="head-area d-flex">
                <div className="text-area">
                  <div className="d-flex align-items-center">
                    <img
                      src="/assets/images/icon/calendar-icon-2.png"
                      alt="icon"
                    />
                    <span>Joined : {`${joined_at}`}</span>
                  </div>
                </div>
              </div>
              <ul>
                <li className="border-area" onClick={handleToggler}>
                  <Link to="/dashboardContainer"
                    onClick={() => { dispatch(setTab("showDepositeTab")); }}
                  >
                    <img
                      src="/assets/images/icon/settings-icon.png"
                      alt="icon"
                    />
                    <p className="mdr">Deposit</p>
                  </Link>
                  <Link to="/dashboard/editProfile">
                    <img
                      src="/assets/images/icon/settings-icon.png"
                      alt="icon"

                    />
                    <p className="mdr"

                    >Edit Profile</p>
                  </Link>
                  <Link to="/dashboard/changePassword" className="">
                    <img
                      src="/assets/images/icon/memberships-icon.png"
                      alt="icon"

                    />
                    <p className="mdr">Change password</p>
                  </Link>
                </li>
                <li >
                  <a
                    onClick={handleLogout}
                    role="button"
                    className="cursor-pointer"
                  >
                    <img
                      src="/assets/images/icon/history-icon.png"
                      alt="icon"
                    />
                    {isFetchingLogout ? (
                      <Loader />
                    ) : (
                      <p className="mdr">Logout</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
