import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/dashboardSlice";

const Tablist = () => {
  const dispatch = useDispatch();
  const dashboardTab = useSelector((state) => state.dashboardReducer.dashboardTab);
  const [Partner, setPartner] = useState(false);

  const handleTabClick = (e) => {
    dispatch(setTab(e.target.id));
  };

  useEffect(() => {
    const userDate = JSON.parse(localStorage.getItem("token"));
    if (userDate.user.user_type == "partner") {
      setPartner(true);
    }
  }, []);

  return (
    <div className="row justify-content-lg-end justify-content-between">
      <div className="col-xl-9 col-lg-12">
        <ul className="nav" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              // className={`${dashboardTab} === 'showDashboard' ?`}
              className={`nav-link ${dashboardTab === 'showDashboard' ? "active" : ""}`}
              id="showDashboard"
              data-bs-toggle="tab"
              data-bs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="true"
              onClick={handleTabClick}
            >
              dashboard
            </button>

          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${dashboardTab === 'showMyBets' ? "active" : ""}`}
              id="showMyBets"
              data-bs-toggle="tab"
              data-bs-target="#my-bets"
              type="button"
              role="tab"
              aria-controls="my-bets"
              aria-selected="false"
              onClick={handleTabClick}
            >
              my bets
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${dashboardTab === 'showDepositeTab' ? "active" : ""}`}
              id="showDepositeTab"
              data-bs-toggle="tab"
              data-bs-target="#deposit"
              type="button"
              role="tab"
              aria-controls="deposit"
              aria-selected="false"
              onClick={handleTabClick}
            >
              deposit
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${dashboardTab === 'showWithdrawTab' ? "active" : ""}`}
              id="showWithdrawTab"
              data-bs-toggle="tab"
              data-bs-target="#withdraw"
              type="button"
              role="tab"
              aria-controls="withdraw"
              aria-selected="false"
              onClick={handleTabClick}
            >
              Withdraw
            </button>
          </li>




          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${dashboardTab === 'showTransaction' ? "active" : ""}`}
              id="showTransaction"
              data-bs-toggle="tab"
              data-bs-target="#transactions"
              type="button"
              role="tab"
              aria-controls="transactions"
              aria-selected="false"
              onClick={handleTabClick}
            >
              transactions
            </button>
          </li>
          {Partner ? (
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${dashboardTab === 'showCreateLink' ? "active" : ""}`}
                id="showCreateLink"
                data-bs-toggle="tab"
                data-bs-target="#createLink"
                type="button"
                role="tab"
                aria-controls="createLink"
                aria-selected="false"
                onClick={handleTabClick}
              >
                createLink
              </button>
            </li>
          ) : (
            ""
          )}

          {Partner ? (
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${dashboardTab === 'showPartnerUser' ? "active" : ""}`}
                id="showPartnerUser"
                data-bs-toggle="tab"
                data-bs-target="#partneruser"
                type="button"
                role="tab"
                aria-controls="partneruser"
                aria-selected="false"
                onClick={handleTabClick}
              >
                PartnerUser
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tablist;
