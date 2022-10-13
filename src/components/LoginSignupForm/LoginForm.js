import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage } from '../../redux/globalSlice'
import { setEmail, setForms, setloginSignupVar, setSignupFields } from '../../redux/loginSignupSlice'
import { setUserCurrencyInLocalStorage, setUserDetailInLocalSorage, setUserTokenInLocalSorage } from '../../utils/localStorage'
import Error from '../reusable/reusableComponent/Error'
import { loginValidation } from '../../utils/validation'
import { useNavigate } from 'react-router-dom'
import { useLazyLoginQuery } from '../../servicesRtkQuery/publicApi'
import Loader from '../reusable/reusableComponent/Loader'
import { useCheckPartnerUrlMutation } from "../../servicesRtkQuery/publicApi";
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ip, setIP] = useState("");
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const { isShowAccountVerifyMessage, isShowPasswordResetMessage } = useSelector((state) => state.loginSignupReducer.loginSignupVar)
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const [checkPartnerUrl] = useCheckPartnerUrlMutation();
    //login rtk 
    const [trigger, result] = useLazyLoginQuery()
    const { isSuccess, isFetching, isError, error } = result

    function handleOnFocus() {
        dispatch(setErrorMessage({}))
        dispatch(setloginSignupVar({
            isShowAccountVerifyMessage: false
        }))
    }
    const handleLoginBtn = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const result = loginValidation(email, password)
        if (result === true) {
            trigger({ email, password })
        } else {
            dispatch(setErrorMessage(result))
            dispatch(setloginSignupVar({
                isShowAccountVerifyMessage: false
            }))
        }

    }
    useEffect(() => {
        if (isSuccess && !isFetching) {

            if (result.data.results.otp) {
                dispatch(setEmail(emailRef.current.value))
                dispatch(setForms({
                    isShowTwoFactorAuthForm: true,
                    isShowLoginForm: false,
                }))
            } else {
            navigate('/crypto-games')
            document.getElementById("close-modal").click();
            setUserTokenInLocalSorage(result.data.results)
            setUserDetailInLocalSorage(result.data.results.user)

            const invited = localStorage.getItem('invited');
            if (invited != null && invited != '') {
                createData(JSON.parse(invited).sagement1, JSON.parse(invited).sagement2, result.data.results.user.id);
            }

            setUserCurrencyInLocalStorage({
                defaultCurrencyId: result.data.results.user.default_currency,
                defaultCurrencyName: result.data.results.user.default_currency_coin_name
            })
            dispatch(setloginSignupVar({
                isUserHasToken: result.data.results?.token,
            }))
            dispatch(setSignupFields({
                name: result.data.results.user.name,
                email: result.data.results.user.email,
                mobile_number: result.data.results.user.mobile_number,
            }))
        }
        }

    }, [isSuccess, isFetching])

    const createData = async (url1, url2, id) => {
        if (ip != null && ip != "") {
            let success = await checkPartnerUrl({
                first_param: url1,
                second_param: url2,
                pc_ip: ip,
                is_user_registered: 1,
                user_id: id,
            });
            if (success.data.success == true) {
                localStorage.removeItem("invited")
            }
        }
    };

    const getIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIP(res.data.IPv4);
    };

    useEffect(() => {
        getIp();
    }, []);

    useEffect(() => {
        if (isError && !isFetching) {
            dispatch(setErrorMessage(error?.data?.message))
        }

    }, [isError, isFetching])

    return (
        <>
            {
                isShowAccountVerifyMessage &&
                <div className="alert alert-success" role="alert">
                    Account verified successfully.
                </div>
            }
            {
                isShowPasswordResetMessage &&
                <div className="alert alert-success" role="alert">
                    Your password has been reset successfully.
                </div>
            }
            <form noValidate action="javascript:void(0);">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor={"email"}>{"Email"}</label>
                        <input
                            id='email'
                            type="email"
                            ref={emailRef}
                            placeholder="Enter Email Address"
                            onFocus={handleOnFocus}
                        />
                        {
                            errorMessages?.email && <Error errorMessage={errorMessages.email} />
                        }
                        <label htmlFor={"password"}>{"Password"}</label>
                        <input
                            id='password'
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter Password "
                            onFocus={handleOnFocus}
                        />
                        {
                            errorMessages?.password && <Error errorMessage={errorMessages.password} />
                        }
                    </div>

                    <div className="col-12">
                        <span className=" w-auto mt-2  " style={{ 'cursor': 'pointer' }} onClick={() => {
                            dispatch(setForms({

                                isShowForgotPasswordForm: true,
                                isShowLoginForm: false,
                            }))
                        }}>
                            Forgot password ?
                        </span>
                    </div>
                    <span className=" w-auto mt-2  " style={{ 'cursor': 'pointer' }} onClick={() => {
                        dispatch(setForms({
                            isShowVerifyForm: true,
                            isShowLoginForm: false,
                        }))
                        dispatch(setErrorMessage({}))
                    }}>
                        Verify account ?
                    </span>
                    <span className="btn-border w-100">
                        <button className="cmn-btn w-100" onClick={handleLoginBtn}>{isFetching ? <Loader /> : <span>Login</span>}</button>
                    </span>
                </div>
            </form>
        </>
    )
}
export default LoginForm