import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage } from '../../redux/globalSlice';
import { setForms, setloginSignupVar } from '../../redux/loginSignupSlice';
import Error from '../reusable/reusableComponent/Error';
import { setPasswordValidation } from '../../utils/validation';
import { useLazySetNewPasswordQuery } from '../../servicesRtkQuery/publicApi';
import Loader from '../reusable/reusableComponent/Loader';

const SetPassword = () => {

    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const dispatch = useDispatch()

    const email = useSelector((state) => state.loginSignupReducer.email)
    const otpRef = useRef(null)
    const newPasswordRef = useRef(null)
    const confirmNewPasswordRef = useRef(null)

    const [trigger, result] = useLazySetNewPasswordQuery()
    const { isSuccess, isFetching, isError, error } = result
    const handleOnFocus = (e) => {
        dispatch(setErrorMessage(''))
    }

    const handleSubmit = () => {
        const otp = otpRef.current.value
        const newPassword = newPasswordRef.current.value
        const confirmNewPassword = confirmNewPasswordRef.current.value
        const result = setPasswordValidation(otp, newPassword, confirmNewPassword)
        if (result === true) {
            dispatch(setErrorMessage(''))
            const data = { email, otp, password: newPassword, password_confirmation: confirmNewPassword }
            trigger(data)
        } else {
            dispatch(setErrorMessage(result))
        }
    }

    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setloginSignupVar({
                isShowPasswordResetMessage: true
            }))
            dispatch(setForms({
                isShowLoginForm: true,
                isShowSetPasswordForm: false,
            }))
        }
    }, [isSuccess, isFetching])

    useEffect(() => {
        if (isError && !isFetching) {
            dispatch(setErrorMessage({ otpError: error?.data?.message }))
        }
    }, [isError, isFetching])


    return (
        <div className="single-input">
            <div className=" fs-6  fw-bold text-warning">
                Set new password
            </div>
            <br />
            <label for={"otp"}>{"OTP"}</label>
            <input
                id='otp'
                type="number"
                placeholder="Enter OTP"
                ref={otpRef}
                onFocus={handleOnFocus}
            />
            {
                errorMessages.otpError &&
                <div className=" w-auto  mt-3">
                    <Error errorMessage={errorMessages.otpError} />
                </div>
            }
            <label className='mt-3' for={"newPassword"}>{"New Password"}</label>
            <input
                id='newPassword'
                type="password"
                placeholder="Enter New Password"
                ref={newPasswordRef}
                onFocus={handleOnFocus}
            />

            <div className="mt-2">
                {
                    errorMessages?.newPassword && <Error errorMessage={errorMessages.newPassword} />
                }
            </div>
            <label className='mt-3' for={"confirmNewPassword"}>{"Confirm New Password"}</label>
            <input
                id='confirmNewPassword'
                type="password"
                placeholder="Enter Confirm Password"
                ref={confirmNewPasswordRef}
                onFocus={handleOnFocus}
            />

            <div className="mt-2">
                {
                    errorMessages?.confirmNewPassword && <Error errorMessage={errorMessages.confirmNewPassword} />
                }
            </div>
            <span className="btn-border w-auto mt-2">
                <button className="cmn-btn " onClick={handleSubmit} >{isFetching ? <Loader /> : <span>Reset password</span>}</button>
            </span>
        </div >
    )
}

export default SetPassword