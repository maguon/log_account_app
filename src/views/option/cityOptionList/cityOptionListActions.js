import * as httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getCityOptionList = () => async (dispatch) => {
    try {
        const url = `${base_host}/city`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.cityOptionList.get_cityOptionList_success, payload: { cityOptionList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.cityOptionList.get_cityOptionList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.cityOptionList.get_cityOptionList_error, payload: { errorMsg: err } })
    }
}

export const getCityOptionListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.cityOptionList.get_cityOptionList_waiting, payload: {} })
}