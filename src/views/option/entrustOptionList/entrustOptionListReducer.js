import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'


const initialState = {
    data: {
        entrustOptionList: [],
    },
    getEntrustOptionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.entrustOptionList.get_entrustOptionList_success]: (state, action) => {
        const { payload: { entrustOptionList } } = action
        return {
            ...state,
            data: {
                entrustOptionList
            },
            getEntrustOptionList: {
                ...state.getEntrustOptionList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.entrustOptionList.get_entrustOptionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getEntrustOptionList: {
                ...state.getEntrustOptionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.entrustOptionList.get_entrustOptionList_waiting]: (state, action) => {
        return {
            ...state,
            getEntrustOptionList: {
                ...state.getEntrustOptionList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.entrustOptionList.get_entrustOptionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getEntrustOptionList: {
                ...state.getEntrustOptionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)