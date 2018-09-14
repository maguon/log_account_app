import * as httpRequest from '../../../../utils/HttpRequest'
import { base_host } from '../../../../configs/Host'
import * as reduxActionTypes from '../../../../reduxActionTypes'
import moment from 'moment'

export const getHandoverStatistics = () => async (dispatch) => {
    try {
        const url = `${base_host}/settleHandoverMonthCount?yearMonth=${moment().format('YYYYMM')}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.homeStatistics.get_handoverStatistics_success, payload: { handoverStatistics: res.result[0] ? res.result[0] : {} } })
        } else {
            dispatch({ type: reduxActionTypes.homeStatistics.get_handoverStatistics_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.homeStatistics.get_handoverStatistics_error, payload: { errorMsg: err } })
    }
}

export const getHandoverStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.homeStatistics.get_handoverStatistics_waiting, payload: {} })
}