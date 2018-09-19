import * as httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { objectExceptNull, ObjectToUrl } from '../../../utils'
import { ToastAndroid } from 'react-native'

export const modifyHandover = (param) => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.handOverEditor.modify_handover_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { settleHandoverId } = param
        const url = `${base_host}/user/${uid}/settleHandover/${settleHandoverId}`
        // console.log('url', url)
        // console.log('putParam', objectExceptNull({
        //     serialNumber: param.serialNumber,
        //     entrustId: param.entrustId,
        //     receivedDate: param.receivedDate,
        //     remark: param.remark
        // }))
        const res = await httpRequest.put(url, objectExceptNull({
            serialNumber: param.serialNumber,
            entrustId: param.entrustId,
            receivedDate: param.receivedDate,
            remark: param.remark
        }))
        // console.log('res', res)
        if (res.success) {
            const handOver = objectExceptNull({
                serial_number: param.serialNumber,
                received_date: param.receivedDate,
                remark: param.remark
            })
            dispatch({ type: reduxActionTypes.handOverList.modify_handOver, payload: { handOver: { settleHandoverId, ...handOver } } })
            dispatch({ type: reduxActionTypes.handOverListForHome.modify_handOverForHome, payload: { handOver: { settleHandoverId, ...handOver } } })
            dispatch({ type: reduxActionTypes.handOverEditor.modify_handover_success, payload: {} })
            ToastAndroid.show(`修改成功！`, 10)
        } else {
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
            dispatch({ type: reduxActionTypes.handOverEditor.modify_handover_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`修改失败：${err}！`, 10)
        dispatch({ type: reduxActionTypes.handOverEditor.modify_handover_error, payload: { errorMsg: err } })
    }
}
