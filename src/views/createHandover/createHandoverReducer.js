import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        settleHandoverId: 0
    },
    createHandover: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [reduxActionTypes.createHandover.create_handover_success]: (state, action) => {
        const { payload: { settleHandoverId } } = action
        return {
            ...state,
            data: {
                settleHandoverId
            },
            createHandover: {
                ...initialState.createHandover,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.createHandover.create_handover_waiting]: (state, action) => {
        return {
            ...state,
            createHandover: {
                ...initialState.createHandover,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.createHandover.create_handover_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createHandover: {
                ...initialState.createHandover,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.createHandover.create_handover_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createHandover: {
                ...initialState.createHandover,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.createHandover.clean_handover]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)