const axios = require('axios')

const AUTH_URL = 'https://auth.riotgames.com/api/v1/authorization'
const USER_URL = 'https://auth.riotgames.com/userinfo'
const ENTITLEMENT_URL = 'https://entitlements.auth.riotgames.com/api/token/v1'
const VAL_STORE_URL='https://pd.ap.a.pvp.net/store/v2/storefront/'
const LOGOUT_URL='https://auth.riotgames.com/logout'

const axiosInstance = axios.create()

var Valorant = function() {
    if(!(this instanceof Valorant)) {
        return new Valorant();
    }    
}

Valorant.prototype.authentication = async function(username, password) {
    let result = {
        status: '',
        token: ''
    }
    
    // const res_authCookie = await authCookie(axiosInstance);
    // if(res_authCookie.status == 200) {
    //     const cookies = res_authCookie.headers['set-cookie'][0]
    //     axiosInstance.defaults.headers.Cookie = cookies
    //     console.log('auhtCookie success')
    //     console.log(res_authCookie)
    // }

    // const res_auth = await authUser(axiosInstance, username, password);
    // if(res_auth.status == 200){
    //     console.log(res_auth)
    //     console.log('------------------------------------auhtUser success-------------------------------------')
    //     if(res_auth.data.type= 'multifactor'){
    //         return {
    //             status: 'MFA',
    //             token: token
    //         }
    //     }
    // }


    createSession().then(async ()=>{
        const res_auth = await authUser(axiosInstance, username, password);
        if(res_auth.status == 200){
            console.log(res_auth)
            console.log('------------------------------------auhtUser success-------------------------------------')
            if(res_auth.data.type= 'multifactor'){
                result.status = 'MFA'
            }
            else result.status = 'OK'
        }
    })

    //xu li token

    return result
}

Valorant.prototype.authentication2 = async function(code) {

    let result = {
        status: '',
        token: ''
    }

    const response = await authUser2(axiosInstance, code);
    if(response.status == 200){
        console.log(res_auth)
        console.log('------------------------------------auhtUser2 success-------------------------------------')
        if(res_auth.data.type= 'multifactor'){
            result.status = 'MFA'
        }
    }

    //xu li token

    return {
        status: 'OK',
        token: token
    }
}

Valorant.prototype.getStore = function(userId, authToken, entitlementToken) {
    return axios.get(
        VAL_STORE_URL + userId,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-Riot-Entitlements-JWT': entitlementToken
            }
        }
    )
}

Valorant.prototype.logOut = function() {
    return axiosInstance.post(
        LOGOUT_URL,
    )
}

module.exports = Valorant

async function createSession() {
    const response = await authCookie(axiosInstance);
    if(response.status == 200) {
        const cookie = response.headers['set-cookie']
        console.log(cookie)
        axiosInstance.defaults.headers.Cookie = cookie
        console.log(response)
        console.log('--------------------------auhtCookie success---------------------------------')
    }
}

function getToken(data) {
    return data
}

function authCookie(axios) {
    return axios.post(
        AUTH_URL,
        {
            "client_id": "riot-client", //"play-valorant-web-prod",
            "nonce": "1",
            "redirect_uri": "http://localhost/redirect", //"https://playvalorant.com/opt_in",
            "response_type": "token id_token"
        },
        {
            headers: {
                'User-Agent': '63.0.5.4887690.4789131 rso-auth (Windows;10;;Professional, x64)'
            }
        }

    )
}

function authUser(axios, username, password) {
    return axios.put(
        AUTH_URL,
        {
            "type": "auth",
            "username": username,
            "password": password,
            "remember": false,
            "language": "en_US"
        },        
        {
            headers: {
                'User-Agent': '63.0.5.4887690.4789131 rso-auth (Windows;10;;Professional, x64)'
            }
        }
    )
}

function authUser2(axios, code) {
    return axios.put(
        AUTH_URL,
        {
            "type": "multifactor",
            "code": code,
            "rememberDevice": false
        }
    )
}

function userInfo(authToken) {
    return axios.get(
        USER_URL,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
    )
}

function entitlement(authToken) {
    return axios.get(
        ENTITLEMENT_URL,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
    )
}