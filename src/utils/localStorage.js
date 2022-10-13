import addDays from "date-fns/addDays";

export const setUserTokenInLocalSorage = (data) => {
    localStorage.setItem('token', JSON.stringify(data))
}

export const setUserDetailInLocalSorage = (data) => {
    localStorage.setItem('localUserDetail', JSON.stringify(data));
}
export const getUserDetailFromLocalSorage = () => {
    const localUserDetail = JSON.parse(localStorage.getItem('localUserDetail'))
    return localUserDetail
}
export const removeUserDetailFromLocalSorage = () => {

}

export const setUserCurrencyInLocalStorage = (data) => {
    localStorage.setItem('userCurrency', JSON.stringify(data));
}
export const getUserCurrencyFromLocalSorage = () => {
    const localUserCurrency = JSON.parse(localStorage.getItem('userCurrency'))
    return localUserCurrency
}

export const showSignupPopFirstTime = () => {
    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
    const x = cookieObj.get("showSignUpPopup")
    if (x != 1) {
        setTimeout(() => {
            document.getElementsByClassName("reg")[0].click();
            document.cookie = `showSignUpPopup=1; path=/; expires=${addDays(new Date(), 1)}`
        }, 1000)
    }
}