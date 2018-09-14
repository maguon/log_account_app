import * as httpRequest from '../../../../utils/HttpRequest'
import { base_host } from '../../../../configs/Host'
import * as reduxActionTypes from '../../../../reduxActionTypes'
import { ObjectToUrl, sleep } from '../../../../utils'
import { ToastAndroid } from 'react-native'
import moment from 'moment'


const pageSize = 20

export const getHandOverListForHome = param => async (dispatch) => {
    try {
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
            receivedDateStart: moment().format('YYYY-MM-01'),
            receivedDateEnd: moment().format('YYYY-MM-DD'),
            ...searchParam
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.handOverListForHome.get_handOverListForHome_success, payload: {
                    handoverList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHome_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHome_error, payload: { errorMsg: err } })
    }
}


export const getHandOverListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHome_waiting, payload: {} })
}


export const getHandOverListForHomeMore = () => async (dispatch, getState) => {
    const state = getState()
    const { handOverListForHomeRecuer: { data: { handoverList, isComplete, search } }, handOverListForHomeRecuer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            number: search.number,
            entrustId: search.entrust ? search.entrust.id : null,
            routeEndId: search.routeEnd ? search.routeEnd.id : null,
            driveId: search.driver ? search.driver.id : null
        }
    }
    if (handOverListForHomeRecuer.getHandoverListForHomeMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getHandOverListForHomeMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_waiting, payload: {} })
            try {
                const url = `${base_host}/settleHandover${ObjectToUrl({
                    start: handoverList.length,
                    size: pageSize,
                    receivedDateStart: moment().format('YYYY-MM-01'),
                    receivedDateEnd: moment().format('YYYY-MM-DD'),
                    ...searchParam
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_success, payload: {
                            handoverList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}  
