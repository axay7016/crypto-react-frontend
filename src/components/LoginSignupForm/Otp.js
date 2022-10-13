import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setForms, setloginSignupVar, setSignupFields } from '../../redux/loginSignupSlice';
import Error from '../reusable/reusableComponent/Error';
import Success from '../reusable/reusableComponent/Success';
import { setErrorMessage } from '../../redux/globalSlice'
import { setSuccessMessage } from '../../redux/globalSlice'
import InputText from '../reusable/fields/InputText';
import { otpValidation } from '../../utils/validation';
import { useLazySendOtpQuery, useLazyVerifyOtpQuery } from '../../servicesRtkQuery/publicApi';
import Loader from '../reusable/reusableComponent/Loader';

const Otp = () => {
    // redux code
    const dispatch = useDispatch()
    let email
    const email1 = useSelector((state) => state.loginSignupReducer.email)
    const { email: email2 } = useSelector((state) => state.loginSignupReducer.loginSignupFields)
    if (email1) {
        email = email1
    } else {
        email = email2
    }


    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const successMessages = useSelector((state) => state.globalReducer.successMessages)
    useEffect(() => { dispatch(setErrorMessage({})) }, [])


    // state are using with in component
    const [isShowResendOtpBtn, setShowResendOtpBtn] = useState()
    const [otpValue, setOtpValue] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setShowResendOtpBtn(true)
        }, 5000)
    }, [isShowResendOtpBtn]);

    const handleChange = (e) => {
        setOtpValue(e.target.value)
    }
    const handleOnFocus = () => {
        dispatch(setErrorMessage({}))
        dispatch(setSuccessMessage({}))
    }

    // OTP submit button
    const [trigger, result] = useLazyVerifyOtpQuery()
    const { isSuccess, isFetching, isError, error } = result
    const handleOtp = () => {
        dispatch(setErrorMessage({}))
        dispatch(setSuccessMessage({}))
        const result = otpValidation(otpValue)
        if (result === true) {
            trigger({ otp: otpValue, email: email })
        } else {
            dispatch(setErrorMessage(result))
        }
    }


    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setForms({
                isShowOtpForm: false,
                isShowVerifyForm: false,
                isShowLoginForm: true,
            }))
            document.getElementById("loginArea-tab").click();
            dispatch(setloginSignupVar({
                isShowAccountVerifyMessage: true
            }))
        }
    }, [isSuccess, isFetching])

    useEffect(() => {
        if (isError && !isFetching) {
            dispatch(setErrorMessage({ otpError: error.data.message }))
        }
        return () => {
            dispatch(setErrorMessage({}))
        }
    }, [isError, isFetching])

    //----------------------------------------------------------------------

    // OTP Resend Button
    const [triggerResendOtp, resultResendOtp] = useLazySendOtpQuery()
    const { isSuccess: isSuccessRO, isFetching: isFetchingRO, } = resultResendOtp

    const handleResendOtp = () => {
        dispatch(setErrorMessage({}))
        dispatch(setSuccessMessage(''))
        setShowResendOtpBtn(false)
        triggerResendOtp({ email: email })
    }
    useEffect(() => {
        if (isSuccessRO && !isFetchingRO) {
            dispatch(setSuccessMessage({ otpSuccess: resultResendOtp.data.results.message }))
        }
    }, [isSuccessRO, isFetchingRO])


    return (
        <div className="single-input">
            <div className=" fs-6  fw-bold text-warning">
                Check your email address for OTP
            </div>
            <br />
            <InputText
                type="text"
                name="otp"
                value={otpValue}
                labelFor="otp"
                id="otp"
                labelName="OTP"
                placeholder="Enter OTP"
                onChange={handleChange}
                onFocus={handleOnFocus}

            />
            {
                errorMessages.otpError &&
                <div className=" w-auto  mt-3">
                    <Error errorMessage={errorMessages.otpError} />
                </div>
            }
            {
                successMessages.otpSuccess &&
                <div className=" w-auto  mt-3">
                    <Success successMessage={successMessages.otpSuccess} />
                </div>
            }
            <span className="btn-border w-auto mt-2">
                <button className="cmn-btn " onClick={handleOtp} >{isFetching ? <Loader /> : <span>Submit</span>}</button>
            </span>

            {
                isShowResendOtpBtn &&
                <span className="btn-border w-auto ms-3 mt-2">
                    <button className="cmn-btn " onClick={handleResendOtp} >Resend OTP</button>
                </span>
            }
        </div >
    )
}

export default Otp