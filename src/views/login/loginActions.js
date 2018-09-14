import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../utils/HttpRequest'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import { base_host } from '../../configs/Host'
import requestHeaders from '../../utils/RequestHeaders'
import { ObjectToUrl } from '../../utils'
import { ToastAndroid } from 'react-native'

export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            mobile: user.mobile
        }
    })
    dispatch({ type: reduxActionTypes.login.clean_login, payload: { mobile: user.mobile } })
}

export const login = (param, tryCount = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.login.login_waiting, payload: {} })
        const { mobile, password } = param
        console.log('param', param)

        // const { initViewReducer: { data: {
        //     version: { currentVersion },
        //     deviceInfo: { deviceToken } } } } = getState()
        const url = `${base_host}/userLogin`
        console.log('url', url)
        const res = await httpRequest.post(url, { mobile, password })
        if (res.success) {
            if (res.result.type == 61 || res.result.type == 69) {
                const getUserInfoUrl = `${base_host}/user${ObjectToUrl({ userId: res.result.userId })}`
                console.log('getUserInfoUrl', getUserInfoUrl)
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                console.log('getUserInfoRes', getUserInfoRes)
                if (getUserInfoRes.success) {
                    const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken, drive_id
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    dispatch({ type: reduxActionTypes.login.login_success, payload: { user } })
                } else {
                    ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.showWithGravity(`登陆失败：身份错误！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.showWithGravity(`登陆失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(login(param, tryCount + 1))
            } else {
                ToastAndroid.showWithGravity(`登陆失败：网络链接失败！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity(`登陆失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
        }
    }

}