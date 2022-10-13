import React, { useEffect, useState } from "react";
import { useCreateLinkMutation } from "../../servicesRtkQuery/dashboardApi";
import Loader from "../reusable/reusableComponent/Loader";

const CreateLink = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [Custom, setCustom] = useState(false);
  const [CustomVal, setCustomVal] = useState("facebook");
  const [SourceLink, setSourceLink] = useState("");
  const [responce, setresponce] = useState(false);
  const [createLink, { isSuccess, isError, isLoading, error }] =
    useCreateLinkMutation();
  const handleWithdraw = async (event) => {
    event.preventDefault();
    let success;
    if (Custom) {
      success = await createLink({
        custom_source: CustomVal,
      });
    } else {
      success = await createLink({
        source: CustomVal,
      });
    }
    if (success.data && success.data.success == true) {
      setSourceLink(success.data.results.url)
      setresponce(true)
      setShowSuccess(false);
    }
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setShowSuccess(true);
    }
    if (isError && !isLoading) {
      setShowError(true);
    }
  }, [isSuccess, isError, isLoading]);

  const handleChange = (e) => {
    setShowSuccess(false);
    setresponce(false)
    setShowError(false);
    setCustomVal(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "customSource") {
      setCustomVal("");
      setCustom(true);
    }
  };
  const handleCustomSource = (e) => {
    setShowSuccess(false);
    setShowError(false);
    setCustomVal(e.target.value);
    setresponce(false)
  };
  return (
    <div className="deposit-with-tab withdraw">
      <div className="row">
        <div className="col-xxl-8 col-xl-7">
          <div className="right-area">
            <p className="para-area">
              Your request will be submitted to the admin of the site for
              approval
            </p>
            <div className="address-bar">
              <form action="#">
                {showSuccess ? (
                  <div className="alert alert-success" role="alert">
                    You have successfully created link.
                  </div>
                ) : (
                  showError && (
                    <div className="alert alert-danger" role="alert">
                      {error.data.message}
                    </div>
                  )
                )}
                {!Custom ? (
                  <div className="col-6">
                    <div className="input-single">
                      <label>Source</label>
                      <div className="input-area ">
                        <select
                          className="withdraw-select"
                          onChange={handleChange}
                        >
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="instagram">InstaGram</option>
                          <option value="customSource">custom Source</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-12">
                    <div className="input-single">
                      <label>Custome Source</label>
                      <div className="input-area">
                        <input
                          onChange={handleCustomSource}
                          value={CustomVal}
                          type="text"
                          placeholder="Enter Source"
                          onFocus={() => {
                            setShowError(false);
                            setShowSuccess(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {responce ? (
                  <div className="col-12">
                    <div className="input-single">
                      <label>Generated Link</label>
                      <div className="input-area">
                        <input
                          value={SourceLink}
                          type="text"
                          placeholder="Enter Source"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <span className="btn-border">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <p
                      className="cmn-btn"
                      role={"button"}
                      onClick={handleWithdraw}
                    >
                      Create Now
                    </p>
                  )}
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
