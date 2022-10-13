import { t } from 'i18next'
import React, { } from 'react'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../redux/globalSlice'
import { setEmailAndPassword, setForms, setloginSignupVar, setSignupFields } from '../../redux/loginSignupSlice'


const LoginSignupHeader = () => {
    const dispatch = useDispatch()


    return (
        <>
            <div className="modal-header justify-content-center">
                <button
                    onClick={() => {
                        dispatch(setErrorMessage({}))
                    }}
                    type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal"
                    aria-label="Close"

                ></button>
            </div>

            <ul className="nav log-reg-btn justify-content-around">

                <li className="bottom-area" role="presentation">
                    <button className="nav-link " id="regArea-tab" data-bs-toggle="tab"
                        data-bs-target="#regArea" type="button" role="tab" aria-controls="regArea"
                        aria-selected="false"

                        onClick={
                            () => {
                                dispatch(setForms({
                                    isShowSignupForm: true,
                                    isShowOtpForm: false,
                                    isShowVerifyForm: false,

                                }))
                                dispatch(setErrorMessage(''))
                                dispatch(setSignupFields({
                                    name: '',
                                    email: '',
                                    password: '',
                                    mobile_number: '',
                                    country: 'Select country',
                                }))
                            }
                        }
                    >
                        {t("signup")}
                    </button>
                </li>
                <li className="bottom-area" role="presentation">
                    <button className="nav-link active" id="loginArea-tab" data-bs-toggle="tab"
                        data-bs-target="#loginArea" type="button" role="tab"
                        aria-controls="loginArea" aria-selected="true"
                        onClick={
                            () => {
                                dispatch(setForms({
                                    isShowLoginForm: true,
                                    isShowOtpForm: false,
                                    isShowForgotPasswordForm: false,

                                }))
                                dispatch(setEmailAndPassword({
                                    email: "",
                                    password: "",
                                }))
                                dispatch(setErrorMessage(''))
                                dispatch(setloginSignupVar({
                                    isShowAccountVerifyMessage: false,
                                    isShowSetPasswordForm: false,
                                }))
                            }
                        }
                    >
                        {t("login")}
                    </button>
                </li>
            </ul>
        </>
    )
}

export default LoginSignupHeader