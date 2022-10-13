import { setErrorMessage } from "../redux/globalSlice";
import { setloginSignupVar } from "../redux/loginSignupSlice";
import { store } from '../redux/store';



// Name of the application
export const WEB_APP_NAME = "Predict888"


// function for waiting 0.5 seconds . this function we using for showing loading on the page
function resolveAfterTime() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(false);
        }, 500);
    });
}
export async function asyncCall() {
    return await resolveAfterTime();
}

const { dispatch } = store
export const unAthorized = (errorMessage) => {
    dispatch(setErrorMessage(errorMessage))
    localStorage.removeItem('token');
    setTimeout(() => {
        dispatch(setloginSignupVar({
            isUserHasToken: null
        }))

    }, 3000)
}




