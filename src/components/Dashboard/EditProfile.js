import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setSuccessMessage } from '../../redux/globalSlice'
import { setSignupFields } from '../../redux/loginSignupSlice'
import InputText from '../reusable/fields/InputText'
import Error from '../reusable/reusableComponent/Error'
import { editProfileValidation } from '../../utils/validation'
import Sidebar from './Sidebar'
import { getUserDetailFromLocalSorage, setUserDetailInLocalSorage } from '../../utils/localStorage'
import Success from '../reusable/reusableComponent/Success'
import { useLazyEditProfileQuery } from '../../servicesRtkQuery/userApi'
import Loader from '../reusable/reusableComponent/Loader'


const EditProfile = () => {

    //redux state
    const dispatch = useDispatch()
    const successMessages = useSelector((state) => state.globalReducer.successMessages)
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    let { name, email, mobile_number } = useSelector((state) => state.loginSignupReducer.loginSignupFields)

    const [trigger, result] = useLazyEditProfileQuery()
    const { isSuccess, isFetching, isError, error } = result


    //local storage
    const { created_at } = getUserDetailFromLocalSorage()

    // handle functions
    function handleChange(evt) {
        const value = evt.target.value;
        dispatch(setSignupFields({
            ...{
                name,
                email,
                mobile_number,
                password: '',
            },
            [evt.target.name]: value
        }))
    }
    function handleOnFocus() {
        dispatch(setErrorMessage({}))
        dispatch(setSuccessMessage({}))
    }
    const handleSubmitBtn = () => {
        const result = editProfileValidation(name, email, mobile_number)
        if (result === true) {
            let data = { name, email, mobile_number }

            if (mobile_number.length === 0) {
                data = { name, email }
            }
            dispatch(setErrorMessage({}))
            dispatch(setSuccessMessage({}))
            trigger(data)
        } else {
            dispatch(setErrorMessage(result))
        }
    }
    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setSuccessMessage({ editProfile: "Your account details have been saved." }))
            setUserDetailInLocalSorage(
                {
                    name,
                    email,
                    mobile_number,
                    created_at: created_at
                }
            )
        }
    }, [isSuccess, isFetching])

    useEffect(() => {
        if (isError && !isFetching) {
            if (error?.data?.message?.mobile_number) {
                dispatch(setErrorMessage({ mobile_number: error.data.message.mobile_number }))
                return
            }
            if (error?.data?.message?.email) {
                dispatch(setErrorMessage({ email: error.data.message.email }))
                return
            }
        }
    }, [isError, isFetching])


    return (
        <section className="dashboard-content pt-120">
            <div className="overlay">

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <Sidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="modify-password" role="tabpanel"
                                    aria-labelledby="modify-password">
                                    <div className="setting-personal-details login-password">
                                        <h5>Edit Profile</h5>
                                        {
                                            errorMessages.auth &&
                                            <div className=" w-auto  mt-3">
                                                <Error errorMessage={'You are unathorize. Please login again'} />
                                            </div>
                                        }
                                        {
                                            successMessages.editProfile &&
                                            <div className=" w-auto  mt-3">
                                                <Success successMessage={successMessages.editProfile} />
                                            </div>
                                        }
                                        <form noValidate action="javascript:void(0);">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <InputText
                                                        type="text"
                                                        name="name"
                                                        value={name}
                                                        labelFor="regname"
                                                        id="regname"
                                                        labelName="Name"
                                                        placeholder="Enter Name"
                                                        onChange={handleChange}
                                                        onFocus={handleOnFocus}
                                                    />
                                                    <div className="mt-2">
                                                        {
                                                            errorMessages?.name && <Error errorMessage={errorMessages.name} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">

                                                    <InputText
                                                        type="email"
                                                        name="email"
                                                        value={email}
                                                        labelFor="regemail"
                                                        id="regemail"
                                                        labelName="Email"
                                                        placeholder="Enter Email Address"
                                                        onChange={handleChange}
                                                        onFocus={handleOnFocus}
                                                    />
                                                    <div className="mt-2">
                                                        {
                                                            errorMessages?.email && <Error errorMessage={errorMessages.email} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <InputText
                                                        type="text"
                                                        name="mobile_number"
                                                        value={mobile_number}
                                                        labelFor="regmobile"
                                                        id="regmobile"
                                                        labelName="Mobile"
                                                        placeholder="Enter Mobile Number"
                                                        onChange={handleChange}
                                                        onFocus={handleOnFocus}
                                                    />
                                                    <div className="mt-2">
                                                        {
                                                            errorMessages?.mobile_number && <Error errorMessage={errorMessages.mobile_number} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <span className="btn-border">
                                                        <button className="cmn-btn" onClick={handleSubmitBtn}>{isFetching ? <Loader /> : <span>Save Profile</span>}</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProfile