// add all fields function here for validation here 

// name validation
const checkName = (name) => {
    if (name.trim() === "") {
        return {
            errorMessage: 'Name must be filled out'
        }
    }
    return false
}
const checkEmail = (email) => {
    if ((email.trim() === "")) {
        return {
            errorMessage: 'Email must be filled out'
        }
    }
    else {
        const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailFormat = EmailRegex.test(email);
        if (!emailFormat) {
            return {
                errorMessage: 'You have entered an invalid email address'
            }
        }
    }
    return false
}

function checkPassword(password) {
    if (!(password.trim() === "")) {
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const uppercasePassword = uppercaseRegExp.test(password);
        const lowercasePassword = lowercaseRegExp.test(password);
        const digitsPassword = digitsRegExp.test(password);
        const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword = minLengthRegExp.test(password);

        let errMsg = "";

        if (!uppercasePassword) {
            errMsg = "At least one uppercase";
        } else if (!lowercasePassword) {
            errMsg = "At least one lowercase";
        } else if (!digitsPassword) {
            errMsg = "At least one digit";
        } else if (!specialCharPassword) {
            errMsg = "At least one special characters";
        } else if (!minLengthPassword) {
            errMsg = "At least 8 characters";
        } else {
            return errMsg = "";
        }
        if (errMsg) {
            return ({
                errorMessage: errMsg,
                isPasswordValid: false

            })
        }
    } else {
        return ({
            errorMessage: "Password must be filled out",
            isPasswordValid: false
        })
    }
    return false
}

const checkMobileNumber = (mobile_number) => {

    if ((mobile_number && mobile_number.trim() === "")) {
        return false
    }
    else {
        const MOBILE_REGEX = /^\d{10}$/
        const MOBILE_FORMAT = MOBILE_REGEX.test(mobile_number);
        if (!MOBILE_FORMAT) {
            return {
                errorMessage: 'Please enter 10 digits Contact # (No spaces or dash)'
            }
        }
    }
    return false
}

const checkCountry = (country) => {
    if (country === "Select country") {
        return {
            errorMessage: 'Please select a country'
        }
    }
    return false
}


const checkOtp = (otp) => {
    if (otp.trim() === "") {
        return {
            errorMessage: 'OTP must be filled out'
        }
    }
    return false
}

const checkComparePassword = (newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword) {
        return {
            errorMessage: 'Confirm password do not match new password'
        }
    }
    return false
}

const checkSubject = (subject) => {
    if (subject.trim() === "") {
        return {
            errorMessage: 'Subject must be filled out'
        }
    }
    return false
}
const checkMessage = (message) => {
    if (message.trim() === "") {
        return {
            errorMessage: 'Message must be filled out'
        }
    }
    return false
}

const checkOdds = (odds) => {
    if (odds.trim() === "") {
        return {
            errorMessage: 'Odds must be filled out'
        }
    }
    return false
}

const checkStake = (stake) => {
    if (stake.trim() === "") {
        return {
            errorMessage: 'Stake must be filled out'
        }
    }
    return false
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const signupValidation = (name, email, password, mobile_number, country) => {

    let result;
    result = checkName(name)
    if (result.errorMessage) {
        return {
            name: result.errorMessage
        }
    }

    result = checkEmail(email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }

    result = checkPassword(password)
    if (result.errorMessage) {
        return {
            password: result.errorMessage
        }
    }

    result = checkMobileNumber(mobile_number)
    if (result.errorMessage) {
        return {
            mobile_number: result.errorMessage
        }
    }

    result = checkCountry(country)
    if (result.errorMessage) {
        return {
            country: result.errorMessage
        }
    }
    return true
}

export const loginValidation = (email, password) => {

    let result;

    result = checkEmail(email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }

    result = checkPassword(password)
    if (result.errorMessage) {
        return {
            password: result.errorMessage
        }
    }
    return true
}

export const verifyAccountValidation = (email) => {

    let result;

    result = checkEmail(email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }

    return true
}
export const otpValidation = (otp) => {

    let result;

    result = checkOtp(otp)
    if (result.errorMessage) {
        return {
            otpError: result.errorMessage
        }
    }
    return true
}

export const setPasswordValidation = (otp, newPassword, confirmNewPassword) => {

    let result;

    result = checkOtp(otp)
    if (result.errorMessage) {
        return {
            otpError: result.errorMessage
        }
    }

    result = checkPassword(newPassword)
    if (result.errorMessage) {
        return {
            newPassword: result.errorMessage
        }
    }

    result = checkComparePassword(newPassword, confirmNewPassword)
    if (result.errorMessage) {
        return {
            confirmNewPassword: result.errorMessage
        }
    }


    return true
}

export const changePasswordValidation = (oldPassword, newPassword, confirmNewPassword) => {

    let result;
    result = checkPassword(oldPassword)
    if (result.errorMessage) {
        return {
            oldPassword: result.errorMessage
        }
    }
    result = checkPassword(newPassword)
    if (result.errorMessage) {
        return {
            newPassword: result.errorMessage
        }
    }

    result = checkComparePassword(newPassword, confirmNewPassword)
    if (result.errorMessage) {
        return {
            confirmNewPassword: result.errorMessage
        }
    }

    return true
}
export const editProfileValidation = (name, email, mobile_number) => {
    let result;
    result = checkName(name)
    if (result.errorMessage) {
        return {
            name: result.errorMessage
        }
    }

    result = checkEmail(email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }
    result = checkMobileNumber(mobile_number)
    if (result.errorMessage) {
        return {
            mobile_number: result.errorMessage
        }
    }
    return true
}
export const contactValidation = (name, email, phone, subject, message) => {



    let result;
    result = checkName(name)
    if (result.errorMessage) {
        return {
            name: result.errorMessage
        }
    }

    result = checkEmail(email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }
    result = checkMobileNumber(phone)
    if (result.errorMessage) {
        return {
            mobile: result.errorMessage
        }
    }
    result = checkSubject(subject)
    if (result.errorMessage) {
        return {
            subject: result.errorMessage
        }
    }
    result = checkMessage(message)
    if (result.errorMessage) {
        return {
            message: result.errorMessage
        }
    }
    return true
}
export const bidModalValidation = (odds, stake) => {
    let result;
    result = checkOdds(odds)
    if (result.errorMessage) {
        return {
            odds: result.errorMessage
        }
    }
    result = checkStake(stake)
    if (result.errorMessage) {
        return {
            stake: result.errorMessage
        }
    }

    return true
}
