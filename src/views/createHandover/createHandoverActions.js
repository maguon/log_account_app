import * as httpRequest from '../../utils/HttpRequest'

import * as reduxActionTypes from '../../reduxActionTypes'
import { objectExceptNull, ObjectToUrl } from '../../utils'
import { ToastAndroid } from 'react-native'

export const createHandover = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { communicationSettingReducer: { data: { base_host } } } = getState()

        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: reduxActionTypes.createHandover.create_handover_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/settleHandover`
        // console.log('url', url)
        const res = await httpRequest.post(url, objectExceptNull({
            serialNumber: param.serialNumber,
            entrustId: param.entrust ? param.entrust.id : null,
            receivedDate: param.receivedDate,
            remark: param.remark
        }))
        // console.log('res', res)
        if (res.success) {
            ToastAndroid.show(`创建成功！`, 10)
            dispatch(getHandover({ settleHandoverId: res.result.settleHandoverId }))
        } else {
            ToastAndroid.show(`创建失败：${res.msg}！`, 10)
            dispatch({ type: reduxActionTypes.createHandover.create_handover_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`创建失败：${err}！`, 10)
        dispatch({ type: reduxActionTypes.createHandover.create_handover_error, payload: { errorMsg: err } })
    }
}


export const getHandover = (param) => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()

        const { settleHandoverId } = param
        const url = `${base_host}/settleHandover${ObjectToUrl({
            settleHandoverId
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.handOverList.add_handOver_success, payload: { handOver: res.result[0] } })
            dispatch({ type: reduxActionTypes.handOverListForHome.add_handOverForHome_success, payload: { handOver: res.result[0] } })
            dispatch({ type: reduxActionTypes.createHandover.create_handover_success, payload: { settleHandoverId } })
        } else {
            dispatch({ type: reduxActionTypes.createHandover.create_handover_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.createHandover.create_handover_error, payload: { errorMsg: err } })
    }
}


export const cleanHandover = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.createHandover.clean_handover, payload: {} })
}