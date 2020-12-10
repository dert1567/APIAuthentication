import axios from 'axios'
import { AUTH_SIGN_UP, 
    AUTH_ERROR, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN, 
    DASHBOARD_GET_DATA } from './types'


/*
ActionsCreator -> create/return Actions ({}) -> dispatched -> middleware -> reducer
*/
export const oauthGoogle = data => {
    return async dispatch => {
        console.log('we received the data', data)
        const res = await axios.post('http://localhost:5000/users/oauth/google', {
            access_token: data
        })
        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        })

        localStorage.setItem('JWT_TOKEN', res.data.token)
        axios.defaults.headers.common['Authorization'] = res.data.token;

    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        console.log('we received the data', data)
        const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
            access_token: data
        })
        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        })

        localStorage.setItem('JWT_TOKEN', res.data.token)
        axios.defaults.headers.common['Authorization'] = res.data.token;

    }
}

export const signUp = data => {

    /*
    step 1) use the form data and make HTTP request to our BE and send it aling 
    step 2) Take the BE's respondse (jwtToken is here now)
    step 3) dispatch use just sihned up (with jwtToken)
    step 4( Save the jwtToken into our local storage)
    */

    return async dispatch => {
        try {
            console.log('[ActionsCreator] sigup got called')
            const res = await axios.post('http://localhost:5000/users/signup', data)
            console.log('[ActionsCreator] sigup dispatch an action')

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token

            })

            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token;

        } catch (err) {
            dispatch({

                type: AUTH_ERROR,
                payload: 'EMAIL is already in use'

            })


        }



    }



}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })

    }
}

export const signIn = data => {

    /*
    step 1) use the form data and make HTTP request to our BE and send it aling 
    step 2) Take the BE's respondse (jwtToken is here now)
    step 3) dispatch use just sihned up (with jwtToken)
    step 4( Save the jwtToken into our local storage)
    */

    return async dispatch => {
        try {
         
            console.log('[ActionsCreator] sigup got called')
            const res = await axios.post('http://localhost:5000/users/signin', data)
            console.log('[ActionsCreator] sigup dispatch an action')

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token

            })

            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (err) {
            dispatch({

                type: AUTH_ERROR,
                payload: 'EMAIL or Password ist wrong'

            })


        }
    }
}


export const getSecret = () => {

    return async dispatch => {

        try {
            console.log('Secret')
            const res = await axios.get('http://localhost:5000/users/secret')
            console.log('res', res)

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })

        } catch (err) {
            console.log('err', err)
        }

    }
}
    






