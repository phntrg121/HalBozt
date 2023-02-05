const axios = require('axios')
const fs = require('fs')

const AUTH_URL = 'https://auth.riotgames.com/api/v1/authorization'
const USER_URL = 'https://auth.riotgames.com/userinfo'
const ENTITLEMENT_URL = 'https://entitlements.auth.riotgames.com/api/token/v1'
const VAL_STORE_URL = 'https://pd.ap.a.pvp.net/store/v2/storefront/'
const LOGOUT_URL = 'https://auth.riotgames.com/logout'
const USER_AGENT = '63.0.5.4887690.4789131 rso-auth (Windows;10;;Professional, x64)'

const axiosInstance = axios.create()

var _access_token
var _entitlement
var _user_id

var Valorant = function () {
    if (!(this instanceof Valorant)) {
        return new Valorant();
    }
}

Valorant.prototype.authentication = async function (username, password) {
    let result = ''

    const res_cookie = await authCookie(axiosInstance);
    if (res_cookie.status == 200) {
        const cookies = res_cookie.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(res_cookie)
        console.log('------------------------------------auhtCookie success-------------------------------------')
    }

    const res_auth = await authUser(axiosInstance, username, password);
    if (res_auth.status == 200) {
        const cookies = res_auth.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(res_auth)
        console.log('------------------------------------auhtUser success-------------------------------------')
        if (res_auth.data.type == 'response') {
            result = 'OK'
            _access_token = getToken(res_auth.data.response.parameters.uri)
            console.log('Access Token: ' + _access_token)
        }
        else if (res_auth.data.type == 'multifactor') {
            result = 'MFA'
        }
        else {
            result = 'ERR'
        }
    }

    // createSession().then(async ()=>{
    //     const res_auth = await authUser(axiosInstance, username, password);
    //     if(res_auth.status == 200){
    //         const cookies = res_auth.headers['set-cookie']
    //         axiosInstance.defaults.headers.Cookie = cookies
    //         console.log(res_auth)
    //         console.log('------------------------------------auhtUser success-------------------------------------')
    //         if(res_auth.data.type= 'multifactor'){
    //             result.status = 'MFA'
    //         }
    //         else result.status = 'OK'
    //     }
    // })

    return result
}

Valorant.prototype.authentication2 = async function (code) {
    let result = ''

    const response = await authUser2(axiosInstance, code);
    if (response.status == 200) {
        const cookies = response.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(response)
        console.log('------------------------------------auhtUser2 success-------------------------------------')
        if (response.data.type == 'response') {
            result = 'OK'
            _access_token = getToken(response.data.response.parameters.uri)
            console.log('Access Token: ' + _access_token)
        }
        else {
            result = 'ERR'
        }
    }

    return result
}

Valorant.prototype.getEntitlement = async function (code) {

    const res_user = await userInfo(axiosInstance, _access_token)
    if (res_user.status == 200) {
        const cookies = res_user.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(res_user)
        console.log('------------------------------------userInfo success-------------------------------------')
        result = 'OK'
        _user_id = res_user.data.sub
        console.log('User ID: ' + _user_id)
    }

    const res_entitlement = await entitlement(axiosInstance, _access_token)
    if (res_entitlement.status == 200) {
        const cookies = res_entitlement.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(res_entitlement)
        console.log('------------------------------------entitlement success-------------------------------------')
        result = 'OK'
        _entitlement = res_entitlement.data.entitlements_token
        console.log('Entitlement: ' + _entitlement)
    }

}

Valorant.prototype.getDailyStore = async function (userId, authToken, entitlementToken) {
    // var storeList = [
    //     '9336ab9d-445c-0872-a283-9f9b61a0098a',
    //     '12831559-44ee-c708-b97c-29a43938e3cd',
    //     'b2f78500-4322-b03d-2745-a3b2208d63fe',
    //     'e34039b6-441d-3e17-2773-bdaf5c3d2faa'
    // ]
    var storeList = []

    const response = await getStore(axiosInstance, _user_id, _access_token, _entitlement)
    if (response.status == 200) {
        const cookies = response.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log('------------------------------------getStore success-------------------------------------')
        storeList = response.data.SkinsPanelLayout.SingleItemOffers
        console.log(storeList)
    }

    // return storeList
    return getListItem(storeList)
}

Valorant.prototype.logOut = async function () {
    const response = await logOut(axios)
    if (response.status == 200) {
        const cookies = response.headers['set-cookie']
        axiosInstance.defaults.headers.Cookie = cookies
        console.log(response)
        console.log('------------------------------------logout success-------------------------------------')
        _access_token = _user_id = _entitlement = ''
    }
}

Valorant.prototype.storeUpdate = function () {
    axios.get('https://valorant-api.com/v1/weapons/skins').then(response => {
        if (response.status == 200) {
            let data = response.data.data;
            let jsonData = JSON.stringify(data)
            fs.writeFileSync('data/weapon_skin.json', jsonData)
        }
    })
}

module.exports = Valorant

async function createSession() {
    const response = await authCookie(axiosInstance);
    if (response.status == 200) {
        const cookie = response.headers['set-cookie']
        console.log(cookie)
        axiosInstance.defaults.headers.Cookie = cookie
        console.log(response)
        console.log('--------------------------auhtCookie success---------------------------------')
    }
}

function getToken(uri) {
    let pos1 = uri.search('access_token=') + 13
    let pos2 = uri.search('&scope')
    let accessToken = uri.substring(pos1, pos2)
    return accessToken
}

function getListItem(list) {
    if (list.length == 0) return []
    const result = []
    const rawData = fs.readFileSync('data/weapon_skin.json')
    const data = JSON.parse(rawData)

    for (const id of list) {
        let wp = data.find(e => e.levels[0].uuid == id)
        result.push(wp.displayName)
    }

    return result
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
                'User-Agent': USER_AGENT
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
                'User-Agent': USER_AGENT
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
        },
        {
            headers: {
                'User-Agent': USER_AGENT
            }
        }

    )
}

function userInfo(axios, authToken) {
    return axios.get(
        USER_URL,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'User-Agent': USER_AGENT
            }
        }
    )
}

function entitlement(axios, authToken) {
    return axios.post(
        ENTITLEMENT_URL,
        {},
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'User-Agent': USER_AGENT
            }
        }
    )
}

function getStore(axios, userId, authToken, entitlementToken) {
    return axios.get(
        VAL_STORE_URL + userId,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-Riot-Entitlements-JWT': entitlementToken,
                'User-Agent': USER_AGENT
            }
        }
    )
}

function logOut(axios) {
    return axios.post(
        LOGOUT_URL,
        {
            headers: {
                'User-Agent': USER_AGENT
            }
        }
    )
}