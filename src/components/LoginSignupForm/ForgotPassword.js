import { t } from 'i18next'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage } from '../../redux/globalSlice'
import { setEmail, setForms } from '../../redux/loginSignupSlice'
import Error from '../reusable/reusableComponent/Error'
import { verifyAccountValidation } from '../../utils/validation'
import { useLazyForgotPasswordQuery } from '../../servicesRtkQuery/publicApi'
import Loader from '../reusable/reusableComponent/Loader'

const ForgotPassword = () => {
    // redux code
    const dispatch = useDispatch()
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const refEmail = useRef(null)
    const [trigger, result] = useLazyForgotPasswordQuery()
    const { isSuccess, isFetching, isError, error } = result
    const handleSendOtp = () => {
        const result = verifyAccountValidation(refEmail.current.value)
        if (result === true) {
            trigger({ email: refEmail.current.value })
        } else {
            dispatch(setErrorMessage(result))
        }
    }
    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setEmail(refEmail.current.value))

            dispatch(setForms({
                isShowForgotPasswordForm: false,
                isShowSetPasswordForm: true
            }))
        }
    }, [isSuccess, isFetching])

    useEffect(() => {
        if (isError && !isFetching) {
            dispatch(setErrorMessage({ email: error?.data?.message }))
        }
    }, [isError, isFetching])


    return (
        <div className="single-input">
            <div className=" fs-6  fw-bold text-warning">
                {t("sendOtpToRecover")}
            </div>
            <br />
            <label for={"email"}>{"Email"}</label>
            <input
                id='email'
                type="email"
                ref={refEmail}
                placeholder="Enter Email Address"
                onFocus={() => {
                    dispatch(setErrorMessage(''))
                }}
            />
            {
                errorMessages.email &&
                <div className=" w-auto  mt-3">
                    <Error errorMessage={errorMessages.email} />
                </div>
            }
            <span className="btn-border w-auto mt-2">
                <button className="cmn-btn " onClick={handleSendOtp} >{isFetching ? <Loader /> : <span>Send OTP to Email</span>}</button>
            </span>
        </div >
    )
}

export default ForgotPassword