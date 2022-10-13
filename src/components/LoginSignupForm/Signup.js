import React, { useEffect } from 'react'
import Otp from './Otp'

import $ from "jquery";
import { useSelector } from 'react-redux'
import { WEB_APP_NAME } from '../../utils/reusableFuncVar'
import SignupForm from './SignupForm'
import FbLogin from './FbLogin'
import GoogleSignUp from './GoogleSignUp'

const Signup = () => {

    // redux code
    const { isShowOtpForm, isShowSignupForm } = useSelector((state) => state.loginSignupReducer.loginSignupForms)
    useEffect(() => {
      $('#google-signup .nsm7Bb-HzV7m-LgbsSe-BPrWId').text('Sign up with Google')
    }, [])
    
    
    return (
        <div className="tab-pane fade" id="regArea" role="tabpanel"
            aria-labelledby="regArea-tab">
            <div className="login-reg-content regMode">
                <div className="modal-body">
                    <div className="head-area">
                        {/* <h6 className="title">Login with</h6> */}
                        <div className="social-link d-flex align-items-center">
                            <GoogleSignUp />
                            {/* <FbLogin /> */}
                        </div>
                    </div>
                </div>
                <div className="form-area">
                    {
                        isShowSignupForm && <SignupForm />
                    }
                    {
                        isShowOtpForm && <Otp />
                    }
                </div>
            </div>
        </div>
    )
}

export default Signup