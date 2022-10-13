import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { setUserCurrencyInLocalStorage, setUserDetailInLocalSorage, setUserTokenInLocalSorage } from '../../utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setloginSignupVar, setSignupFields } from '../../redux/loginSignupSlice'
import { useLazySocialLoginQuery } from '../../servicesRtkQuery/publicApi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const GoogleSignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        window?.google?.accounts?.id.initialize({
            client_id: '1045035534014-3vqmhhpr29ckpav2q1hh0iq9ktmsj1ab.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        window?.google?.accounts?.id.renderButton(
            document.getElementById('google-signup'),
            {
                theme: "outline", size: "large"
            }
        );
    }, [])

    const [trigger, result] = useLazySocialLoginQuery()
    const { isSuccess, isFetching, isError, error } = result

    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        const [name, email] = [userObject.name, userObject.email]
        const res = await axios.get("https://geolocation-db.com/json/");
        const data = { name, email, country: res?.data?.country_name }
        trigger(data)
    }
    useEffect(() => {
        if (isSuccess && !isFetching) {
            navigate('/crypto-games')
            document.getElementById("close-modal").click();
            setUserTokenInLocalSorage(result.data.results)
            setUserDetailInLocalSorage(result.data.results.user)


            setUserCurrencyInLocalStorage({
                defaultCurrencyId: result.data.results.user.default_currency,
                defaultCurrencyName: result.data.results.user.default_currency_coin_name
            })
            dispatch(setloginSignupVar({
                isUserHasToken: result.data.results?.token,
            }))
            dispatch(setSignupFields({
                name: result.data.results.user.name,
                email: result.data.results.user.email,
                mobile_number: result.data.results.user.mobile_number,
            }))
        }
        if (isError && !isFetching) {
            alert(error)
        }
    }, [isSuccess, isFetching, isError])
    return (
        <>
            <span id='google-signup'></span>
        </>
    )
}
export default GoogleSignUp