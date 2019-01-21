import * as httpRequest from '../../utils/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { ObjectToUrl } from '../../utils'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import * as reduxActions from '../../reduxActions'

export const updatePassword = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const { confirmPassword, newPassword, oldPassword } = getFormValues('updatePasswordForm')(state)
    const { loginReducer: { data: { user: { uid } } } } = state
    if (newPassword == confirmPassword) {
        try {
            const url = `${base_host}/user/${uid}/password`
            const res = await httpRequest.put(url, {
                originPassword: oldPassword,
                newPassword
            })
            if (res.success) {
                ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.updatePassword.change_Password_success, payload: {} })
                dispatch(reduxActions.login.cleanLogin())
            } else {
                ToastAndroid.showWithGravity(`修改失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: reduxActionTypes.updatePassword.change_Password_failed, payload: { failedMsg: res.msg } })
            }
        } catch (err) {
            ToastAndroid.showWithGravity(`修改失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: reduxActionTypes.updatePassword.change_Password_error, payload: { errorMsg: err } })
        }
    } else {
        ToastAndroid.showWithGravity(`两次输入的新密码不同!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}
