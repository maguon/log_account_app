import * as httpRequest from '../../../utils/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { objectExceptNull, ObjectToUrl } from '../../../utils'
import { ToastAndroid } from 'react-native'

export const getHandOverCarList = param => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/settleHandoverCarRel?transferFlag=0&&settleHandoverId=${param.settleHandoverId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.handOverCarList.get_handOverCarList_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.handOverCarList.get_handOverCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.handOverCarList.get_handOverCarList_err, payload: { errorMsg: err } })
    }
}

export const getHandOverCarListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.handOverCarList.get_handOverCarList_waiting, payload: {} })
}

export const delCar = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { communicationSettingReducer: { data: { base_host} } } = getState()

        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: reduxActionTypes.handOverCarList.del_carForHandOverCarList_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/settleHandover/${param.settleHandoverId}/car/${param.carId}`
        // console.log('url', url)
        const res = await httpRequest.del(url)
        // console.log('res', res)
        if (res.success) {
            ToastAndroid.show(`删除车辆成功！`, 10)
            dispatch({ type: reduxActionTypes.handOverCarList.del_carForHandOverCarList_success, payload: {} })
            dispatch(getHandOverCarList({ settleHandoverId: param.settleHandoverId }))
        } else {
            ToastAndroid.show(`删除车辆失败：${res.msg}！`, 10)
            dispatch({ type: reduxActionTypes.handOverCarList.del_carForHandOverCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`删除车辆失败：${err}！`, 10)
        dispatch({ type: reduxActionTypes.handOverCarList.del_carForHandOverCarList_error, payload: { errorMsg: err } })
    }
}

export const addCar = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: reduxActionTypes.handOverCarList.add_carForHandOverCarList_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/settleHandoverCarRel`
        // console.log('url', url)
        const res = await httpRequest.post(url, objectExceptNull({
            settleHandoverId: param.settleHandoverId,
            carId: param.car_id
        }))
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.handOverCarList.add_carForHandOverCarList_success, payload: {} })
            dispatch(getHandOverCarList({ settleHandoverId: param.settleHandoverId }))
            dispatch({ type: reduxActionTypes.handOverListForHome.modify_handOverForHome, payload: { handOver: { settleHandoverId: param.settleHandoverId, r_short_name: param.r_short_name } } })
            dispatch({ type: reduxActionTypes.handOverList.modify_handOver, payload: { handOver: { settleHandoverId: param.settleHandoverId, r_short_name: param.r_short_name } } })
            ToastAndroid.show(`添加车辆成功！`, 10)
        } else {
            dispatch({ type: reduxActionTypes.handOverCarList.add_carForHandOverCarList_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.show(`添加车辆失败：${res.msg}！`, 10)
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`添加车辆失败：${err}！`, 10)
        dispatch({ type: reduxActionTypes.handOverCarList.add_carForHandOverCarList_error, payload: { errorMsg: err } })
    }
}