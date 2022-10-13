import i18next from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/Common.css";
import "../../styles/Dropdown.css";
import "../../styles/TradingviewModal.css"
import "../../styles/Elements.css"

const NavItems = ({ setIsShowToggler }) => {
  const { isShowError, statusCode } = useSelector(
    (state) => state.globalReducer.apiError
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (statusCode == 404) {
      navigate("/api-error");
    }
    if (statusCode > 499) {
      navigate("/server-error");
    }
  }, [isShowError]);

  // const { t } = useTranslation(["common"]);
  // const { i18n } = useTranslation(["common"]);

  // useEffect(() => {
  //     if (localStorage.getItem("i18nextLng")?.length > 2) {
  //         i18next.changeLanguage("en");
  //     }
  // }, []);

  // const handleLanguageChange = (e) => {
  //     i18n.changeLanguage(e.target.value);
  // };
  const handleClick = () => {
    setIsShowToggler(true)
  }
  return (
    <>
      {/* <li className="nav-item">
                <NavLink exact activeclassname="active" to="/not-found" className="nav-link " aria-current="page">
                    Not found
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact activeclassname="active" to="/api-error" className="nav-link " aria-current="page">
                    Api Error
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact activeclassname="active" to="/server-error" className="nav-link " aria-current="page">
                    Server Error
                </NavLink>
            </li> */}
      <li className="nav-item">
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="nav-link "
          aria-current="page"
          onClick={handleClick}

        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeclassname="active"
          to="/crypto-games"
          className="nav-link "
          aria-current="page"
          onClick={handleClick}

        >
          Games
        </NavLink>
      </li>

      
      {/* <div className="single-item select">
                <select
                    value={localStorage.getItem("i18nextLng")}
                    onChange={handleLanguageChange}
                >
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
            </div> */}
    </>
  );
};

export default NavItems;
