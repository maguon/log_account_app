import * as httpRequest from '../../../utils/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getDriverOptionList = () => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const url = `${base_host}/drive`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.driverOptionList.get_driverOptionList_success, payload: { driverOptionList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.driverOptionList.get_driverOptionList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.driverOptionList.get_driverOptionList_error, payload: { errorMsg: err } })
    }
}

export const getDriverOptionListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.driverOptionList.get_driverOptionList_waiting, payload: {} })
}