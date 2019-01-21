import * as httpRequest from '../../../utils/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { ObjectToUrl, sleep } from '../../../utils'
import { ToastAndroid } from 'react-native'

const pageSize = 20

export const getHandOverList = param => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        let searchParam = {}
        if (param) {
            searchParam = {
                number: param.number,
                entrustId: param.entrust ? param.entrust.id : null,
                receiveId: param.receive ? param.receive.id : null,
                routeEndId: param.routeEnd ? param.routeEnd.id : null
            }
        }
        const url = `${base_host}/settleHandover${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.handOverList.get_handOverList_success, payload: {
                    handoverList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.handOverList.get_handOverList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.handOverList.get_handOverList_error, payload: { errorMsg: err } })
    }
}


export const getHandOverListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.handOverList.get_handOverList_waiting, payload: {} })
}


export const getHandOverListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()

    const { handOverListRecuer: { data: { handoverList, isComplete, search } }, handOverListRecuer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            number: search.number,
            entrustId: search.entrust ? search.entrust.id : null,
            routeEndId: search.routeEnd ? search.routeEnd.id : null,
            driveId: search.driver ? search.driver.id : null
        }
    }
    if (handOverListRecuer.getHandoverListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getHandOverListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.handOverList.get_handOverListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/settleHandover${ObjectToUrl({
                    start: handoverList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.handOverList.get_handOverListMore_success, payload: {
                            handoverList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.handOverList.get_handOverListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.handOverList.get_handOverListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}  
