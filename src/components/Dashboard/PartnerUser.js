import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePartnerUserQuery } from "../../servicesRtkQuery/dashboardApi";
import { getUserDetailFromLocalSorage } from "../../utils/localStorage";
import Loader from "../reusable/reusableComponent/Loader";

const PartnerUser = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [Custom, setCustom] = useState(false);
  const [CustomVal, setCustomVal] = useState("");
  const [SourceLink, setSourceLink] = useState("");
  const [responce, setresponce] = useState(false);
  const [lable, setLable] = useState([]);
  // code for getting sidebar coins
  const { data: partnerData } = usePartnerUserQuery();


  const handleCheck = (val) => {
    return partnerData?.results?.column_details.some(
      (item) => val.name === item.label
    );
  };

  return (
    <div className="deposit-with-tab withdraw">
      <div className="row">
        <div className="col-xxl-12 col-xl-7">
          {partnerData?.success == true ? (
            <div className="table-responsive">
              <div className="right-area">
                <table className="table">
                  <thead>
                    {partnerData?.results?.length == 0 ? (
                      <tr>
                        <th scope="col">Data not found</th>
                      </tr>
                    ) : (
                      ""
                    )}

                    <tr>
                      {partnerData?.results?.column_details?.map(
                        (item, key) => {
                          return (
                            <th key={key} scope="col">
                              {item.label}
                            </th>
                          );
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {partnerData?.results?.user_details?.map((item, key) => {
                      return (
                        <tr key={key}>
                          {partnerData?.results?.column_details?.map(
                            (label, key) => {
                              return (
                                <td key={key} scope="col">
                                  {item?.[label.column_name]}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerUser;
