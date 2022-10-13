import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import { useCheckPartnerUrlMutation } from "../../servicesRtkQuery/publicApi";
import NavItems from "./NavItems";
import {
  setAutoDetectCountry,
} from "../../redux/loginSignupSlice";
import Logout from "../LoginSignupForm/Logout";
import { Nav } from "react-bootstrap";
// import FbLogin from "../LoginSignupForm/FbLogin";
import axios from "axios";
import LoginSignupButton from "./LoginSignupButton";
import { showSignupPopFirstTime } from "../../utils/localStorage";
import $ from "jquery";

const Header = () => {
  const widthOfWindow = window.innerWidth

  // code for showing popup
  useEffect(() => {
    if (!isUserHasToken) {
      showSignupPopFirstTime()
    }
  }, [])


  // useEffect(() => {
  //   console.log("Show popup");
    // $("body").on('click',function(){
    // console.log("Show 416544654");
    //   $(".menu-close").trigger("click");
    // });
  // }, []);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [ip, setIP] = useState("");
  const location = useLocation();
  const [checkPartnerUrl, { isSuccess, isError, isLoading, error }] = useCheckPartnerUrlMutation();
  useEffect(() => {
    const invited = localStorage.getItem("invited");
    if (invited == null || invited == "" && ip != '' || ip != null) {
      const url = location.pathname.split("/");
      if (url[1] && url[1] == "ca") {
        let parms = { sagement1: url[1], sagement2: url[2] };
        createData(url[1], url[2]);
        localStorage.setItem("invited", JSON.stringify(parms));
      }
    } else {
      // navigate("/");
    }
  }, [ip]);

  // toggler 
  const togglerDivRef = useRef(null);
  const [isShowToggler, setIsShowToggler] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
  }, []);
  const handleOutsideClick = (e) => {
    if (togglerDivRef?.current?.contains && togglerDivRef?.current?.contains(e.target)) {
      setIsShowToggler(true);
    } else {
      setIsShowToggler(false);
    }
  };
  //---------------------------------------------------------------------------------


  const createData = async (url1, url2) => {
    if (ip != null && ip != "") {
      let success = await checkPartnerUrl({
        first_param: url1,
        second_param: url2,
        pc_ip: ip,
        is_user_registered: 0,
        user_id: 0,
      });
      if (success.data.success == true) {
        navigate("/");
      }
    }
  };

  const getIp = async () => {

    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res?.data?.IPv4);
    dispatch(setAutoDetectCountry(res?.data?.country_name))
  };
  useEffect(() => {
    getIp();
  }, []);

  const { isUserHasToken } = useSelector(
    (state) => state.loginSignupReducer.loginSignupVar
  );
  return (
    <>
      <header className="header-section user-dashboard">
        <div className="overlay">
          <div className="container">
            <div className="row d-flex header-area">
              <Nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand ">
                  <img
                    src="/assets/images/logo.png"
                    className="logo w-50 h-50"
                    alt="imageOfLogo"
                  />
                </Link>
                {
                  // !isUserHasToken && 
                }
                {(!isUserHasToken && widthOfWindow <= 767) ?
                  <>
                    <LoginSignupButton mobileClass={"mobile-view-button"} />
                    <button
                      className="navbar-toggler collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbar-content"
                      ref={togglerDivRef}
                    >
                      <i className="fas fa-bars"></i>
                    </button>
                  </> :
                  <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-content"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                }
                <div
                  className={`collapse navbar-collapse justify-content-end ${isShowToggler && 'show'}`}
                  id="navbar-content"
                >
                  <i className="fa fa-times menu-close" aria-hidden="true" onClick={() => {
                    setIsShowToggler(true)
                  }}></i>
                  <ul className="navbar-nav mr-auto mb-2 mb-lg-0"
                  >
                    <NavItems setIsShowToggler={setIsShowToggler} />
                  </ul>
                  {isUserHasToken && <Logout setIsShowToggler={setIsShowToggler} />}
                  {(!isUserHasToken && widthOfWindow > 767) && <LoginSignupButton />}
                </div>
              </Nav>
            </div>
          </div>
        </div>
      </header >
      <LoginSignupForm />
    </>
  );
};

export default Header;
