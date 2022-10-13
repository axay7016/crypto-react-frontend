import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Faq from '../components/Home/Faq'
import InputText from '../components/reusable/fields/InputText';
import TextArea from '../components/reusable/fields/TextArea';
import Error from '../components/reusable/reusableComponent/Error';
import Sucess from '../components/reusable/reusableComponent/Success';
import { asyncCall } from '../utils/reusableFuncVar';
import { contactValidation } from '../utils/validation';
import { setErrorMessage } from '../redux/globalSlice';
import { setSuccessMessage } from '../redux/globalSlice';
import { useCreateContactMutation } from '../servicesRtkQuery/publicApi';
import Loader from '../components/reusable/reusableComponent/Loader';

const Contact = () => {
    const { t } = useTranslation(["common"]);
    const dispatch = useDispatch()
    window.scrollTo(0, 0)

    const [createContact, { isSuccess, isError, isLoading }] = useCreateContactMutation()
    if (isError) { alert('Something went wrong') }
    useEffect(() => {
        return () => {
            setErrorMessage('')
            setSuccessMessage('')
            setContactValues({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",

            })
        }
    }, [])

    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const successMessages = useSelector((state) => state.globalReducer.successMessages)
    const [contactValues, setContactValues] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    function handleChange(e) {
        const { name, value } = e.target;
        setContactValues({
            ...contactValues,
            [name]: value,
        });
    }
    function handleOnFocus() {
        dispatch(setErrorMessage(''))
        dispatch(setSuccessMessage(''))
    }
    const handleSendMessage = (e) => {
        e.preventDefault()
        const result = contactValidation(contactValues.name,
            contactValues.email, contactValues.phone,
            contactValues.subject, contactValues.message)
        if (result === true) {
            createContact(contactValues)
        } else {
            dispatch(setErrorMessage(result))
        }
        // return false
    }
    useEffect(() => {
        if (isSuccess && !isLoading) {
            dispatch(setSuccessMessage({ msg: 'Thanks for contacting us. We will reach you soon.' }))
            setContactValues({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
        }
    }, [isSuccess, isLoading])



    // code for scrolling to top and loader
    const [loading, setLoading] = useState(true);
    asyncCall().then((result) => {
        setLoading(result)
    })
    if (loading) return <div className="preloader" id="preloader"></div>

    return (
        <>
            {/* <!-- Banner Section start --> */}
            <section class="banner-section inner-banner contact">
                <div class="overlay">
                    <div class="shape-area">
                        <img src="assets/images/contact-illus.png" class="contact-illu" alt="imageFor" />
                    </div>
                    <div class="banner-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-9 col-md-10">
                                    <div class="main-content">
                                        <h1>{t("contactUs")}</h1>
                                        <div class="breadcrumb-area">
                                            <nav aria-label="breadcrumb">
                                                <ol class="breadcrumb d-flex align-items-center">
                                                    <li className="breadcrumb-item"><Link to="/" >{t("home")}</Link></li>
                                                    <li className="breadcrumb-item active" aria-current="page">{t("contactUs")}</li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Banner Section end --> */}
            <section className="contact-section">
                <div className="overlay">
                    <div className="container bg-area">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="section-header text-center">
                                    <h2 className="title">{t("getInTouchWithUs")}</h2>
                                    <p>{t("fillUptheForm")}</p>
                                </div>
                            </div>
                        </div>
                        {
                            successMessages.msg &&
                            <Sucess successMessage={'Thanks for contacting us. We will reach you soon.'} />
                        }
                        <div className="row justify-content-center ">
                            <div className="col-lg-12">
                                <div className="form-content">
                                    <form noValidate>
                                        <div className="row justify-content-center">

                                            <div className="col-md-6">
                                                <InputText
                                                    type="text"
                                                    name="name"
                                                    value={contactValues.name}
                                                    labelFor="contactName"
                                                    id="contactName"
                                                    labelName="Your name"
                                                    placeholder="Steve Jobs"
                                                    onChange={handleChange}
                                                    onFocus={handleOnFocus}
                                                />
                                                <div className='mt-2'>
                                                    {
                                                        errorMessages?.name && <Error errorMessage={errorMessages.name} />
                                                    }
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <InputText
                                                    type="email"
                                                    name="email"
                                                    value={contactValues.email}
                                                    labelFor="contactEmail"
                                                    id="contactEmail"
                                                    labelName="Your email address"
                                                    placeholder="example@gmail.com"
                                                    onChange={handleChange}
                                                    onFocus={handleOnFocus}
                                                />
                                                <div className='mt-2'>
                                                    {
                                                        errorMessages?.email && <Error errorMessage={errorMessages.email} />
                                                    }
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <InputText
                                                    type="text"
                                                    name="phone"
                                                    value={contactValues.phone}
                                                    labelFor="contactMobile"
                                                    id="contactMobile"
                                                    labelName="Your mobile number"
                                                    placeholder="(123) 480 - 3540"
                                                    onChange={handleChange}
                                                    onFocus={handleOnFocus}
                                                />

                                                <div className='mt-2'>
                                                    {
                                                        errorMessages?.mobile && <Error errorMessage={errorMessages.mobile} />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <InputText
                                                    type="text"
                                                    name="subject"
                                                    value={contactValues.subject}
                                                    labelFor="contactSubject"
                                                    id="contactSubject"
                                                    labelName="Your subject"
                                                    placeholder="how I will get money ?"
                                                    onChange={handleChange}
                                                    onFocus={handleOnFocus}
                                                />
                                                <div className='mt-2'>
                                                    {
                                                        errorMessages?.subject && <Error errorMessage={errorMessages.subject} />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <TextArea
                                                    name="message"
                                                    value={contactValues.message}
                                                    labelFor="contactMessage"
                                                    id="contactMessage"
                                                    labelName="Your message"
                                                    placeholder="Describe your message in detail"
                                                    cols={30}
                                                    rows={10}
                                                    onChange={handleChange}
                                                    onFocus={handleOnFocus}
                                                />
                                                <div className='mt-2'>
                                                    {
                                                        errorMessages?.message && <Error errorMessage={errorMessages.message} />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-10">
                                                <div className="btn-border w-100 mt-40">
                                                    <button className="cmn-btn w-100"
                                                        disabled={false}
                                                        onClick={handleSendMessage}>{isLoading ? <Loader /> : 'Send Message'} </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Faq />
        </>
    )
}

export default Contact