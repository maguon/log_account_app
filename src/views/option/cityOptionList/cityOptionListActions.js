import * as httpRequest from '../../../utils/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getCityOptionList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
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