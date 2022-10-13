import { useSelector } from 'react-redux'
import VerifyAccount from './VerifyAccount'
import Otp from './Otp'
import LoginForm from './LoginForm'
import ForgotPassword from './ForgotPassword'
import SetPassword from './SetPassword'
import FbLogin from './FbLogin'
import GoogleLogin from './GoogleLogin'
import TwoFactorAuth from './TwoFactorAuth'
const Login = () => {

    // redux code
    const {
        isShowOtpForm, isShowVerifyForm,
        isShowForgotPasswordForm, isShowSetPasswordForm, isShowLoginForm, isShowTwoFactorAuthForm
    } = useSelector((state) => state.loginSignupReducer.loginSignupForms)

    return (

        <div className="tab-pane fade show active" id="loginArea" role="tabpanel"
            aria-labelledby="loginArea-tab">
            <div className="login-reg-content ">
                <div className="modal-body">
                    <div className="head-area">
                        {/* <h6 className="title">Login with</h6> */}
                        <div className="social-link d-flex align-items-center test">
                            {/* <FbLogin /> */}
                            <GoogleLogin />
                        </div>
                    </div>
                    <div className="form-area">
                        {
                            isShowLoginForm && <LoginForm />
                        }
                        {
                            isShowVerifyForm && <VerifyAccount />
                        }
                        {
                            isShowOtpForm && <Otp />
                        }
                        {
                            isShowForgotPasswordForm && <ForgotPassword />
                        }
                        {
                            isShowSetPasswordForm && <SetPassword />
                        }
                        {
                            isShowTwoFactorAuthForm && <TwoFactorAuth />
                        }

                        {/* <div className="bottom-area text-center">
                            <p>Not a member ?
                                <a href="javascript:void(0)" class="reg-btn">&nbsp; Register</a>
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login