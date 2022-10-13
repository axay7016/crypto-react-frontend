import React, { useEffect, useState } from "react";
import { useGetDashboardQuery } from "../../servicesRtkQuery/dashboardApi";
import { getUserDetailFromLocalSorage } from "../../utils/localStorage";
import Loader from "../reusable/reusableComponent/Loader";
import Error from "../reusable/reusableComponent/Error";
import Success from "../reusable/reusableComponent/Success";
import {
  useLazyLisitngLinkQuery,
  useGetPartnerDashboardQuery,
  useWillNotSignUpBonusMutation,
} from "../../servicesRtkQuery/dashboardApi";

const Dashboard = () => {
  const { id, user_type } = getUserDetailFromLocalSorage();
  const [
    willNotSignUpBonus,
    {
      isSuccess: bonusSuccess,
      isError: bonusError,
      isLoading: bonusLoading,
      error: bonuserror,
    },
  ] = useWillNotSignUpBonusMutation();
  const [trigger, result] = useLazyLisitngLinkQuery();
  const { isSuccess, isLoading, isFetching, isError, error } = result;
  const { data: partnerData } = useGetPartnerDashboardQuery();

  const { data, isSuccess: isSuccessDash } = useGetDashboardQuery(id);
  const [BonusStatus, setBonusStatus] = useState(false);

  // code for getting sidebar coins
  let listingLink = [];
  if (isSuccess) {
    listingLink = result?.data?.results;
  }
  useEffect(() => {
    trigger();
  }, []);

  const handleBonus = async (e, id, url) => {
    let success;
    success = await willNotSignUpBonus({
      signup_bonus: e.target.checked,
      url: url,
      id: id,
    });

    if (success?.data?.success) {
      setBonusStatus(true);
      const timer = setTimeout(() => {
        setBonusStatus(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      {BonusStatus ? <Success /> : ""}

      <div
        className="tab-pane fade show active"
        id="dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
        <div className="row">
          {user_type == "partner" ? (
            <>
              <div className="col-xl-4 col-lg-6">
                <div className="single-info">
                  <img
                    src="assets/images/icon/user-info-icon-1.png"
                    alt="icon"
                  />
                  <div className="text-area">
                    <h4>
                      {partnerData?.results[0]?.total_visits == null
                        ? 0
                        : partnerData?.results[0]?.total_visits}
                    </h4>
                    <p className="mdr">Total Visits</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="single-info">
                  <img
                    src="assets/images/icon/user-info-icon-1.png"
                    alt="icon"
                  />
                  <div className="text-area">
                    <h4>
                      {partnerData?.results[0]?.total_joined == null
                        ? 0
                        : partnerData?.results[0]?.total_joined}
                    </h4>
                    <p className="mdr">Total Joined</p>
                  </div>
                </div>
              </div>{" "}
              {isLoading || isFetching ? (
                <span className="mt-2">
                  <Loader />
                </span>
              ) : isError ? (
                <Error errorMessage={`${error.data.message.auth}`} />
              ) : (
                isSuccess && (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">URL</th>
                          <th scope="col">Total Visits</th>
                          <th scope="col">Total Joined</th>
                          <th scope="col">Total Deposit</th>
                          <th scope="col">Total Rake</th>
                          <th scope="col">WillNotGetSignUpBonus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listingLink?.map((item, key) => {
                          return (
                            <tr key={key}>
                              <th>
                                {item.url != null
                                  ? "/" + item?.url?.split("/")[4]
                                  : "-"}
                                <i
                                  className="far fa-copy url-copy"
                                  onClick={() =>
                                    navigator.clipboard.writeText(item.url)
                                  }
                                ></i>
                              </th>
                              <td>
                                {item.total_visits != null
                                  ? item.total_visits
                                  : "-"}
                              </td>
                              <td>
                                {item.total_joined != null
                                  ? item.total_joined
                                  : "-"}
                              </td>
                              <td>
                                {item?.total_deposit?.map((deposite) => {
                                  return `${deposite.name}:${deposite.balance}, `;
                                })}
                              </td>
                              <td>
                                {item?.total_rake?.map((rake) => {
                                  var num = Number(rake.comission_amount); // The Number() only visualizes the type and is not needed
                                  var roundedString = num.toFixed(2);
                                  var rounded = Number(roundedString);
                                  return `${rake.name}:${rounded}, `;
                                })}
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleBonus(e, item.id, item.url)
                                  }
                                  defaultChecked={
                                    item?.willNotGetSignUpBonus == 1
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <div className=" d-flex flex-wrap  dash-win  ">
                <div className="">
                  <div className="single-info total-winning total-winning-2">
                    <img
                      src="assets/images/icon/user-info-icon-1.png"
                      alt="icon"
                    />
                    <div className="text-area ">
                      <h5 className="">{data?.results?.total_winning}</h5>
                      <p className="mdr">Total Winning</p>
                    </div>
                  </div>
                </div>
                <div className="ms-1 ">
                  <div className="single-info">
                    <img
                      src="assets/images/icon/user-info-icon-2.png"
                      alt="icon"
                    />
                    <div className="text-area">
                      <h5>{data?.results?.user_group}</h5>
                      <p className="mdr">User Group</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
