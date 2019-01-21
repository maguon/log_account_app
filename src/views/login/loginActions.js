import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import httpRequest from '../../utils/HttpRequest'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
// import { base_host } from '../../configs/Host'
import requestHeaders from '../../utils/RequestHeaders'
import { ObjectToUrl } from '../../utils'
import { ToastAndroid } from 'react-native'
import * as android_app from '../../configs/android_app.json'


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

        // console.log('param', param)

        // const { initViewReducer: { data: {
        //     version: { currentVersion },
        //     deviceInfo: { deviceToken } } } } = getState()
        const { mobile, password,server } = param
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")
        const base_host = `http://api.${server}/api`
        const url = `${base_host}/userLogin`
        // console.log('url', url)
        const res = await httpRequest.post(url, { mobile, password })
        if (res.success) {
            if (res.result.type == 61 || res.result.type == 69) {
                const getUserInfoUrl = `${base_host}/user${ObjectToUrl({ userId: res.result.userId })}`
                // console.log('getUserInfoUrl', getUserInfoUrl)
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                // console.log('getUserInfoRes', getUserInfoRes)
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
                    await dispatch(reduxActions.communicationSetting.saveCommunicationSetting({ url: server }))
                    await dispatch({ type: reduxActionTypes.login.login_success, payload: { user } })
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
        // console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(login(param, tryCount + 1))
            // } else {
                ToastAndroid.showWithGravity(`登陆失败：网络链接失败！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
            // }
        } else {
            ToastAndroid.showWithGravity(`登陆失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
        }
    }

}


export const validateVersion = param => async (dispatch) => {
    const currentStep = 1
    try {
        const { mobile, password,server } = param
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")
        const base_host = `http://api.${server}/api`
        dispatch({ type: reduxActionTypes.initView.init_app_waiting, payload: {} })
        const url = `${base_host}/app${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            // console.log('versionInfo', versionInfo)

            const currentVersionArr = android_app.version.split('.')
            // console.log('currentVersionArr', currentVersionArr)

            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
            // console.log('versionList', versionList)

            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
                // console.log('versionInfo', versionInfo)

            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            if (versionInfo.force_update != 1) {
                // console.log('valdate_version_success', versionInfo)
                // dispatch({ type: reduxActionTypes.initView.valdate_version_success, payload: { versionInfo, step: currentStep } })
                // dispatch(loadLocalStorage())
                dispatch(login(param))
            } else {
                // console.log('valdate_version_low', versionInfo)
                dispatch({ type: reduxActionTypes.initView.valdate_version_low, payload: { versionInfo, step: currentStep } })
            }
        } else {
            // console.log('valdate_version_failed', versionInfo)

            dispatch({ type: reduxActionTypes.initView.valdate_version_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`初始化错误:${err}`, 10)
        // if (err.message == 'Network request failed') {
        //     //尝试20次
        //     if (tryCount < 20) {
        //         await sleep(1000)
        //         dispatch(validateVersion(tryCount + 1))
        //     } else {
        dispatch({ type: reduxActionTypes.initView.valdate_version_error, payload: { errorMsg: err } })
        Actions.mainRoot()
        //     }
        // } else {
        //     dispatch({ type: reduxActionTypes.initView.valdate_version_error, payload: { errorMsg: err } })
        // }
    }
}