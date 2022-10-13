import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Error from '../reusable/reusableComponent/Error';
import { setErrorMessage } from '../../redux/globalSlice';
import { setEmail, setForms } from '../../redux/loginSignupSlice';
import { verifyAccountValidation } from '../../utils/validation';
import { useLazySendOtpQuery } from '../../servicesRtkQuery/publicApi';
import Loader from '../reusable/reusableComponent/Loader';


const VerifyAccount = () => {

    // redux code
    const dispatch = useDispatch()
    const refEmail = useRef(null)
    const [trigger, result] = useLazySendOtpQuery()
    const { isSuccess, isFetching, isError, error } = result

    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const handleSendOtp = () => {
        const result = verifyAccountValidation(refEmail.current.value)
        if (result === true) {
            trigger({ email: refEmail.current.value })
        } else {
            dispatch(setErrorMessage(result))
        }
    }
    useEffect(() => { dispatch(setErrorMessage({})) }, [])
    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setEmail(refEmail.current.value))
            dispatch(setForms({
                isShowOtpForm: true,
                isShowVerifyForm: false
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
                Verify your account
            </div>
            <br />
            <label htmlFor={"email"}>{"Email"}</label>
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
                errorMessages?.email &&
                <div className=" w-auto  mt-3">
                    <Error errorMessage={errorMessages.email} />
                </div>
            }
            <span className="btn-border w-auto mt-4">
                <button className="cmn-btn " onClick={handleSendOtp} >{isFetching ? <Loader /> : <span>Send OTP to Email</span>}</button>
            </span>
        </div >
    )
}

export default VerifyAccount