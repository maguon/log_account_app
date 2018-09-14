import * as reduxActionTypes from '../../../../reduxActionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    data: {
        handoverStatistics: {}
    },
    getHandoverStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.homeStatistics.get_handoverStatistics_success]: (state, action) => {
        const { payload: { handoverStatistics } } = action
        return {
            ...state,
            data: {
                handoverStatistics
            },
            getHandoverStatistics: {
                ...state.getHandoverStatistics,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.homeStatistics.get_handoverStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandoverStatistics: {
                ...state.getHandoverStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.homeStatistics.get_handoverStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getHandoverStatistics: {
                ...state.getHandoverStatistics,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.homeStatistics.get_handoverStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandoverStatistics: {
                ...state.getHandoverStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



}, initialState)