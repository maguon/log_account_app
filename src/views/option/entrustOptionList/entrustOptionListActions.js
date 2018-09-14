import * as httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getEntrustOptionList = () => async (dispatch) => {
    try {
        const url = `${base_host}/entrust`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.entrustOptionList.get_entrustOptionList_success, payload: { entrustOptionList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.entrustOptionList.get_entrustOptionList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.entrustOptionList.get_entrustOptionList_error, payload: { errorMsg: err } })
    }
}

export const getEntrustOptionListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.entrustOptionList.get_entrustOptionList_waiting, payload: {} })
}