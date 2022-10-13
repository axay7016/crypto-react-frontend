import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "../../redux/globalSlice";
import Error from "../reusable/reusableComponent/Error";
import { changePasswordValidation } from "../../utils/validation";
import Sidebar from "./Sidebar";
import { setloginSignupVar } from "../../redux/loginSignupSlice";
import Success from "../reusable/reusableComponent/Success";
import { useTranslation } from "react-i18next";
import { useLazyChangePasswordQuery, useLazyLogoutQuery } from "../../servicesRtkQuery/userApi";
import Loader from "../reusable/reusableComponent/Loader";

const ChangePassword = () => {
    const { t } = useTranslation(["common"]);

    //redux
    const dispatch = useDispatch();
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages);
    const successMessages = useSelector((state) => state.globalReducer.successMessages);

    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmNewPasswordRef = useRef(null);

    const handleOnFocus = () => {
        dispatch(setErrorMessage({}));
    };
    //change password RTK
    const [trigger, result] = useLazyChangePasswordQuery()
    const { isSuccess, isFetching, isError, error } = result
    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setSuccessMessage({
                changePasswordSuccess:
                    " Your password has been changed successfully . Redirecting to home page.",
            }));
            setTimeout(() => {
                dispatch(setSuccessMessage({}));
                triggerLogout();
            }, 3000);
        }
        if (isError && !isFetching) {
            dispatch(setErrorMessage(error?.data?.message))
        }
    }, [isSuccess, isFetching, isError])


    // logout RTK

    const [triggerLogout, resultLogout] = useLazyLogoutQuery()
    const { isSuccess: isSuccessLogout, isFetching: isFetchingLogout } = resultLogout
    useEffect(() => {
        if (isSuccessLogout && !isFetchingLogout) {
            dispatch(setloginSignupVar({ isUserHasToken: null }))
            localStorage.removeItem('token');
        }
    }, [isSuccessLogout, isFetchingLogout])

    const handleSubmit = (e) => {
        e.preventDefault();

        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmNewPassword = confirmNewPasswordRef.current.value;
        const result = changePasswordValidation(oldPassword, newPassword, confirmNewPassword)

        if (result === true) {
            dispatch(setErrorMessage({}));
            const data = { old_password: oldPassword, password: newPassword, password_confirmation: confirmNewPassword };
            trigger(data);
        } else {
            dispatch(setErrorMessage(result));
        }
    };

    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">
                <div className="dashboard-heading">
                    <div className="container">
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <Sidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="tab-content">
                                <div
                                    className="tab-pane fade show active"
                                    id="modify-password"
                                    role="tabpanel"
                                    aria-labelledby="modify-password"
                                >
                                    <div className="setting-personal-details login-password">
                                        <h5>{t("modifyLoginPassword")}</h5>
                                        {errorMessages.auth && (
                                            <div className=" w-auto  mt-3">
                                                <Error
                                                    errorMessage={
                                                        "You are unathorize. Please login again"
                                                    }
                                                />
                                            </div>
                                        )}
                                        <div>
                                            {successMessages?.changePasswordSuccess && (
                                                <Success
                                                    successMessage={
                                                        successMessages?.changePasswordSuccess
                                                    }
                                                />
                                            )}
                                        </div>
                                        <form >
                                            <div className="row">
                                                <div className="col-lg-12">

                                                    <label htmlFor={"oldPwd"}>{"Old Password"}</label>
                                                    <input
                                                        id='oldPwd'
                                                        type="password"
                                                        ref={oldPasswordRef}
                                                        placeholder="Enter Old Password"
                                                        onFocus={handleOnFocus}
                                                    />

                                                    <div className="mt-2">
                                                        {errorMessages?.oldPassword && (
                                                            <Error errorMessage={errorMessages.oldPassword} />
                                                        )}
                                                        {errorMessages?.password && (
                                                            <Error errorMessage={errorMessages.password} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor={"newpass"}>{"New Password"}</label>
                                                    <input
                                                        id='newpass'
                                                        type="password"
                                                        ref={newPasswordRef}
                                                        placeholder="Enter New Password"
                                                        onFocus={handleOnFocus}
                                                    />
                                                    <div className="mt-2">
                                                        {errorMessages?.newPassword && (
                                                            <Error errorMessage={errorMessages.newPassword} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor={"confirmpass"}>{"Confirm Password"}</label>
                                                    <input
                                                        id='confirmpass'
                                                        type="password"
                                                        ref={confirmNewPasswordRef}
                                                        placeholder="Enter Confirm Password"
                                                        onFocus={handleOnFocus}
                                                    />

                                                    <div className="mt-2">
                                                        {errorMessages?.confirmNewPassword && (
                                                            <Error
                                                                errorMessage={errorMessages.confirmNewPassword}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <span className="btn-border">
                                                        <button className="cmn-btn" onClick={handleSubmit}>
                                                            {isFetching ? <Loader /> : <span> {t("submit")}</span>}
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
