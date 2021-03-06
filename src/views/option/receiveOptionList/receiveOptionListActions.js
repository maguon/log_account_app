import * as httpRequest from '../../../utils/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getReceiveOptionList = () => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/receive`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.receiveOptionList.get_receiveOptionList_success, payload: { receiveOptionList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.receiveOptionList.get_receiveOptionList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.receiveOptionList.get_receiveOptionList_error, payload: { errorMsg: err } })
    }
}

export const getReceiveOptionListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.receiveOptionList.get_receiveOptionList_waiting, payload: {} })
}