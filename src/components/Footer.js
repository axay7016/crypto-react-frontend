import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setSuccessMessage } from '../redux/globalSlice'
import Error from './reusable/reusableComponent/Error'
import Success from './reusable/reusableComponent/Success'
import { useAddSubcribeMutation } from '../servicesRtkQuery/publicApi'

const Footer = () => {
    const { t } = useTranslation(["common"]);
    const [addSubcribe, { isSuccess, isError }] = useAddSubcribeMutation()
    const emailRef = useRef("")

    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const successMessages = useSelector((state) => state.globalReducer.successMessages)
    const dispatch = useDispatch()

    const handleOnFocus = () => {
        dispatch(setErrorMessage({}))
        dispatch(setSuccessMessage({}))
    }


    const handleOnClick = (e) => {
        e.preventDefault();
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emailRef.current.value === "") {
            dispatch(setErrorMessage({ email: "Please enter email" }))
        } else if (!(emailRef.current.value.match(mailformat))) {
            dispatch(setErrorMessage({ email: "Please enter a valid email " }))
        }
        else if (emailRef.current.value.length > 0) {
            addSubcribe({ email: emailRef.current.value })
        }
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(setSuccessMessage({ email: "Your account details have been saved." }))
            emailRef.current.value = ""
        }
        if (isError) {
            dispatch(setErrorMessage({ email: "You are already subscribed." }))
        }
        return () => {
            dispatch(setErrorMessage({}))
            dispatch(setSuccessMessage({}))
        }
    }, [isError, isSuccess])
    return (
        <footer className="footer-section">
            <div className="container pt-120">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="newsletter" id="newsletter">
                            <div className="section-text text-center">
                                <h5 className="sub-title invisible">{t("subcribeUs")}</h5>
                                <h3 className="title">{t("joinTheWhitelist")}</h3>
                                <p>{t("byJoiningWhitelist")}</p>
                            </div>
                            <form noValidate >
                                <div className="form-group d-flex align-items-center">
                                    <input type="email" name="email" id="email"
                                        placeholder="Enter your email address"
                                        ref={emailRef}
                                        onFocus={handleOnFocus}
                                    />
                                    <button onClick={handleOnClick} >
                                        <img src="assets/images/icon/arrow-right-2.png" alt="icon" />
                                    </button>

                                </div>
                            </form>
                            <div className='mt-2'>
                                {
                                    errorMessages?.email && <Error errorMessage={errorMessages.email} />
                                }
                                {
                                    successMessages?.email && <Success successMessage={successMessages.email} />
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="footer-bottom-area pt-120">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="menu-item">
                                <span>
                                    <img src="assets/images/logo.png" alt="logo" />
                                </span>
                                <ul className="footer-link">
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/terms">Terms of Services</a></li>
                                    <li><a href="/privacy">Privacy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="copyright">
                                <div className="copy-area">
                                    <p>
                                        Copyright © <span className='text-success'>Predict888</span>
                                    </p>
                                </div>
                                <div className="social-link d-flex align-items-center">
                                    <a href="https://www.facebook.com/Predict888/" target="_blank" rel='noreferrer' >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://twitter.com/Predict888_" target="_blank" rel='noreferrer'>
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com/predict888_/" target="_blank" rel='noreferrer'>
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/company/predict888/" target="_blank" rel='noreferrer'>
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer