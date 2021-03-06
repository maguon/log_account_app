import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    modifyHandover: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [reduxActionTypes.handOverEditor.modify_handover_success]: (state, action) => {
        return {
            ...state,
            modifyHandover: {
                ...initialState.modifyHandover,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverEditor.modify_handover_waiting]: (state, action) => {
        return {
            ...state,
            modifyHandover: {
                ...initialState.modifyHandover,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.handOverEditor.modify_handover_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyHandover: {
                ...initialState.modifyHandover,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverEditor.modify_handover_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyHandover: {
                ...initialState.modifyHandover,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)