import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import MyBets from "./MyBets";
import Sidebar from "./Sidebar";
import Tablist from "./Tablist";
import Transaction from "./Transaction";
import WithdrawAmount from "./WithdrawAmount";
import CreateLink from "./CreateLink";
import PartnerUser from "./PartnerUser";
import DepositAmount from "./DepositAmount";

const DashboardContainer = () => {
  // redux state
  const dashboardTab = useSelector(
    (state) => state.dashboardReducer.dashboardTab
  );
  window.scrollTo(0, 0)
  return (
    <section className="dashboard-content pt-120">
      <div className="overlay">
        <div className="dashboard-heading">
          <div className="container mt-5">
            <Tablist />
          </div>
        </div>
        <div className="container mw-100">
          <div className="row justify-content-center">
            <Sidebar />
            <div className="col-xl-9 col-lg-8">
              <div className="tab-content ">
                {dashboardTab === "showDashboard" && <Dashboard />}
                {dashboardTab === "showTransaction" && <Transaction />}
                {dashboardTab === "showMyBets" && <MyBets />}
                {dashboardTab === "showWithdrawTab" && <WithdrawAmount />}
                {dashboardTab === "showDepositeTab" && <DepositAmount />}
                {dashboardTab === "showCreateLink" && <CreateLink />}
                {dashboardTab === "showPartnerUser" && <PartnerUser />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardContainer;
