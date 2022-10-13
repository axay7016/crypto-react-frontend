import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setErrorMessage, setSuccessMessage } from "../../redux/globalSlice";
import {
    setEmailAndPassword,
    setForms,
    setloginSignupVar,
    setSignupFields,
} from "../../redux/loginSignupSlice";
const LoginSignupButton = ({ mobileClass }) => {
    const { t } = useTranslation(["common"]);
    const dispatch = useDispatch();

    return (
        <div className={`right-area header-action d-flex align-items-center max-un ${mobileClass && 'mobileClass'}`}>
            <button
                type="button"
                className={`login ${mobileClass && 'text-white me-2 bg-transparent'}`}
                data-bs-toggle="modal"
                data-bs-target="#loginMod"
                onClick={() => {
                    dispatch(setErrorMessage(""));
                    dispatch(setSuccessMessage(""));
                    dispatch(
                        setEmailAndPassword({
                            email: "",
                            password: "",
                        })
                    );
                    dispatch(
                        setForms({
                            isShowLoginForm: true,
                            isShowSignupForm: true,
                            isShowOtpForm: false,
                            isShowVerifyForm: false,
                            isShowForgotPasswordForm: false,
                            isShowSetPasswordForm: false,
                        })
                    );
                    dispatch(
                        setloginSignupVar({
                            isShowAccountVerifyMessage: false,
                        })
                    );
                    document.getElementById("loginArea-tab").click();
                }}
            >
                {t("login")}
            </button>
            <button
                type="button"
                className="cmn-btn reg"
                data-bs-toggle="modal"
                data-bs-target="#loginMod"
                onClick={() => {
                    dispatch(setErrorMessage(""));
                    dispatch(
                        setForms({
                            isShowOtpForm: false,
                            isShowVerifyForm: false,
                            isShowSignupForm: true,
                            isShowLoginForm: true,
                        })
                    );

                    dispatch(
                        setloginSignupVar({
                            isShowAccountVerifyMessage: false,
                        })
                    );
                    dispatch(
                        setSignupFields({
                            name: "",
                            email: "",
                            password: "",
                            mobile_number: "",
                            country: "Select country",
                        })
                    );
                    document.getElementById("regArea-tab").click();
                }}
            >
                {t("signup")}
            </button>
        </div>
    )
}

export default LoginSignupButton