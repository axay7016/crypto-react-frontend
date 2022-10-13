import React from 'react'
import Login from './Login'
import LoginSignupHeader from './LoginSignupHeader'
import Signup from './Signup'
import GoogleLogin from './GoogleLogin'

const LoginSignupForm = () => {
    return (
        <div className="log-reg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="modal fade" id="loginMod">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <LoginSignupHeader />
                                    <div className="tab-content">
                                        <Login />
                                        <Signup />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignupForm