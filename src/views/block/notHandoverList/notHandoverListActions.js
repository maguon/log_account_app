import * as httpRequest from '../../../utils/HttpRequest'
import { base_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { ObjectToUrl, sleep } from '../../../utils'
import { ToastAndroid } from 'react-native'

const pageSize = 20

export const getNotHandoverCarList = param => async (dispatch) => {
    try {
        let searchParam = {}
        if (param) {
            searchParam = {
                vinCode: param.vinCode,
                entrustId: param.entrust ? param.entrust.id : null,
                receiveId: param.receive ? param.receive.id : null,
                routeEndId: param.routeEnd ? param.routeEnd.id : null,
                dpRouteTaskId: param.dpRouteTaskId,
                driveId: param.driver ? param.driver.id : null,
                taskPlanDateStart: param.taskPlanDateStart,
                taskPlanDateEnd: param.taskPlanDateEnd
            }
        }
        const url = `${base_host}/notSettleHandover${ObjectToUrl({
            carLoadStatus: 2,
            transferFlag: 0,
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.notHandoverList.get_notHandoverCarList_success, payload: {
                    notHandoverCarList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarList_error, payload: { errorMsg: err } })
    }
}


export const getNotHandoverCarListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarList_waiting, payload: {} })
}


export const getNotHandoverCarListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { notHandoverListRecuer: { data: { notHandoverCarList, isComplete, search } }, notHandoverListRecuer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            vinCode: search.vinCode,
            entrustId: search.entrust ? search.entrust.id : null,
            receiveId: search.receive ? search.receive.id : null,
            routeEndId: search.routeEnd ? search.routeEnd.id : null,
            dpRouteTaskId: search.dpRouteTaskId,
            driveId: search.driver ? search.driver.id : null,
            taskPlanDateStart: search.taskPlanDateStart,
            taskPlanDateEnd: search.taskPlanDateEnd
        }
    }
    if (notHandoverListRecuer.getNotHandoverCarListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getNotHandoverCarListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/notSettleHandover${ObjectToUrl({
                    start: notHandoverCarList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.notHandoverList.get_notHandoverCarListMore_success, payload: {
                            notHandoverCarList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.notHandoverList.get_notHandoverCarListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}  
