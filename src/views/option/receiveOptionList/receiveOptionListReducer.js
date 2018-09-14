import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'


const initialState = {
    data: {
        receiveOptionList: [],
    },
    getReceiveOptionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.receiveOptionList.get_receiveOptionList_success]: (state, action) => {
        const { payload: { receiveOptionList } } = action
        return {
            ...state,
            data: {
                receiveOptionList
            },
            getReceiveOptionList: {
                ...state.getReceiveOptionList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.receiveOptionList.get_receiveOptionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getReceiveOptionList: {
                ...state.getReceiveOptionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.receiveOptionList.get_receiveOptionList_waiting]: (state, action) => {
        return {
            ...state,
            getReceiveOptionList: {
                ...state.getReceiveOptionList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.receiveOptionList.get_receiveOptionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getReceiveOptionList: {
                ...state.getReceiveOptionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)