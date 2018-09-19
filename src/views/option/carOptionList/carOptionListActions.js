import * as httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { ObjectToUrl } from '../../../utils'
import { getFormValues } from 'redux-form'

export const getCarOptionList = param => async (dispatch, getState) => {
    try {
        const url = `${base_host}/notSettleHandover${ObjectToUrl({
            carLoadStatus: 2,
            transferFlag: 0,
            entrustId: param.entrustId,
            // receiveId: param.receiveId,
            vinCode: param.keyword,
            start: 0,
            size: 10
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        const state = getState()
        const fromValues = getFormValues('carOptionalSearchForm')(state)
        // console.log('fromValues', fromValues)
        if (fromValues && param.keyword == fromValues.keyword) {
            if (res.success) {
                dispatch({ type: reduxActionTypes.carOptionList.get_carOptionList_success, payload: { carOptionList: res.result } })
            } else {
                dispatch({ type: reduxActionTypes.carOptionList.get_carOptionList_failed, payload: { failedMsg: res.msg } })
            }
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.carOptionList.get_carOptionList_error, payload: { errorMsg: err } })
    }
}


export const getCarOptionListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.carOptionList.get_carOptionList_waiting, payload: {} })
}


export const cleanCarOptionList = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.carOptionList.clean_carOptionList, payload: {} })
}