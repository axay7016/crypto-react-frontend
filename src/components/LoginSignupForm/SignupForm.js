import React, { useEffect, useRef, useState } from "react";
import "../../styles/Dropdown.css";

import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../redux/globalSlice";
import { setForms, setSignupFields } from "../../redux/loginSignupSlice";
import InputText from "../reusable/fields/InputText";
import Error from "../reusable/reusableComponent/Error";
import { signupValidation } from "../../utils/validation";
import { useLazyRegisterQuery } from "../../servicesRtkQuery/publicApi";
import Loader from "../reusable/reusableComponent/Loader";
import { countries } from "../../utils/data";
import ReactFlagsSelect from "react-flags-select";
import { countryCode } from "../../utils/countryCode";

const SignupForm = () => {
  const [selected, setSelected] = useState("IN");
  const countryRef = useRef();
  const dispatch = useDispatch();
  const { name, email, password, mobile_number } = useSelector(
    (state) => state.loginSignupReducer.loginSignupFields
  );
  const errorMessages = useSelector(
    (state) => state.globalReducer.errorMessages
  );
  const countryDetect = useSelector(
    (state) => state.loginSignupReducer.autoDetectCountry
  );

  useEffect(()=>{
    const countryName = countryCode.filter((item) => item.name == countryDetect)[0];
    if(countryName != undefined){
        setSelected(countryName?.code)
    }
    
  },[])

  const [trigger, result] = useLazyRegisterQuery();
  const { isSuccess, isFetching, isError, error } = result;
  // InputText  component method start

  function handleChange(evt) {
    const value = evt.target.value;
    const countryName = countryCode.filter((item) => item.code == selected)[0];
    dispatch(
      setSignupFields({
        ...{
          name,
          email,
          password,
          mobile_number,
          country: countryName?.name,
        },
        [evt.target.name]: value,
      })
    );
  }
  function handleOnFocus() {
    dispatch(setErrorMessage({}));
  }
  // Signup Button
  const handleSignupBtn = () => {
    const countryName = countryCode.filter((item) => item.code == selected)[0];
    console.log(countryName?.name, "*-*-*-**-*-*-*");
    dispatch(setErrorMessage({}));
    const result = signupValidation(
      name,
      email,
      password,
      mobile_number,
      countryName?.name
    );
    if (result === true) {
      let country = countryName.name;
      let data = { name, email, password, mobile_number, country };
      if (mobile_number.length === 0) {
        data = { name, email, password, country };
      }
      trigger(data);
    } else {
      dispatch(setErrorMessage(result));
    }
  };

  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch(
        setForms({
          isShowOtpForm: true,
          isShowSignupForm: false,
        })
      );
    }
    return () => {
      dispatch(setErrorMessage({}));
    };
  }, [isSuccess, isFetching]);

  useEffect(() => {
    if (isError && !isFetching) {
      dispatch(setErrorMessage(error.data.message));
    }
    return () => {
      dispatch(setErrorMessage({}));
    };
  }, [isError, isFetching]);

  return (
    <form noValidate action="javascript:void(0);">
      <div className="row">
        <div className="col-12">
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
          {errorMessages?.name && <Error errorMessage={errorMessages.name} />}

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
          {errorMessages?.email && <Error errorMessage={errorMessages.email} />}
          <InputText
            type="password"
            name="password"
            value={password}
            labelFor="regpassword"
            id="regpassword"
            labelName="Password"
            placeholder="Enter Password"
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
          {errorMessages?.password && (
            <Error errorMessage={errorMessages.password} />
          )}

          {/* <div className="mobile-with-country">
            <div className="input-single">
              <label>Country</label>
              <div className="input-area ">
                <ReactFlagsSelect
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  selectButtonClassName="menu-flags-button"
                  className="menu-flags"
                  searchable
                  searchPlaceholder="Search countries"
                  showSelectedLabel={false}
                />
              </div>
            </div> */}
           <div className="country-flag">
           <ReactFlagsSelect
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  selectButtonClassName="menu-flags-button"
                  className="menu-flags"
                  searchable
                  searchPlaceholder="Search countries"
                  showSelectedLabel={false}
                />
                <InputText
            className="mobile-number"
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
           </div>
           
            
            {errorMessages?.mobile_number && (
              <Error errorMessage={errorMessages.mobile_number} />
            )}

{errorMessages?.country && (
              <Error errorMessage={errorMessages.country} />
            )}
          {/* </div> */}
        </div>
        <span className="btn-border w-100">
          <button className="cmn-btn w-100" onClick={handleSignupBtn}>
            {isFetching ? <Loader /> : <span>Sign Up</span>}
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
