import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setloginSignupVar, setSignupFields } from '../../redux/loginSignupSlice';
import Error from '../reusable/reusableComponent/Error';
import { setErrorMessage } from '../../redux/globalSlice'
import { setSuccessMessage } from '../../redux/globalSlice'
import InputText from '../reusable/fields/InputText';
import { otpValidation } from '../../utils/validation';
import { useLazyTwoFactorAuthOtpQuery } from '../../servicesRtkQuery/publicApi';
import Loader from '../reusable/reusableComponent/Loader';
import { useNavigate } from 'react-router-dom';
import { setUserCurrencyInLocalStorage, setUserDetailInLocalSorage, setUserTokenInLocalSorage } from '../../utils/localStorage';

const TwoFactorAuth = () => {


    // redux code
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const email = useSelector((state) => state.loginSignupReducer.email)
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const successMessages = useSelector((state) => state.globalReducer.successMessages)
    useEffect(() => { dispatch(setErrorMessage()) }, [])


    // state are using with in component
    const [otpValue, setOtpValue] = useState('')


    const handleChange = (e) => {
        setOtpValue(e.target.value)
    }
    const handleOnFocus = () => {
        dispatch(setErrorMessage(''))
        dispatch(setSuccessMessage(''))
    }

    // OTP submit button
    const [trigger, result] = useLazyTwoFactorAuthOtpQuery()
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
            navigate('/crypto-games')
            document.getElementById("close-modal").click();
            setUserTokenInLocalSorage(result.data.results)
            setUserDetailInLocalSorage(result.data.results.user)
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
    }, [isSuccess, isFetching])

    // useEffect(() => {
    //     if (isError && !isFetching) {
    //         dispatch(setErrorMessage({ verificationFailed: 'The OTP entered is incorrect.' }))
    //     }
    // }, [isError, isFetching])

    //----------------------------------------------------------------------
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
                placeholder="Enter OTP here"
                onChange={handleChange}
                onFocus={handleOnFocus}

            />
            {/* {
                errorMessages.verificationFailed &&
                <div className=" w-auto  mt-3">
                    <Error errorMessage={errorMessages.verificationFailed} />
                </div>
            } */}
            <span className="btn-border w-auto mt-2">
                <button className="cmn-btn " onClick={handleOtp} >{isFetching ? <Loader /> : <span>Submit</span>}</button>
            </span>
        </div >
    )
}

export default TwoFactorAuth
