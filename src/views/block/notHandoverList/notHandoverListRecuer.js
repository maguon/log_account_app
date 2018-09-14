import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    data: {
        notHandoverCarList: [],
        search: null,
        isCompaled: false
    },
    getNotHandoverCarList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getNotHandoverCarListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.notHandoverList.get_notHandoverCarList_success]: (state, action) => {
        const { payload: { notHandoverCarList, isComplete, search } } = action
        return {
            ...state,
            data: {
                notHandoverCarList,
                isComplete,
                search
            },
            getNotHandoverCarList: {
                ...state.getNotHandoverCarList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getNotHandoverCarList: {
                ...state.getNotHandoverCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarList_waiting]: (state, action) => {
        return {
            ...state,
            getNotHandoverCarList: {
                ...state.getNotHandoverCarList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getNotHandoverCarList: {
                ...state.getNotHandoverCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.notHandoverList.get_notHandoverCarListMore_success]: (state, action) => {
        const { payload: { notHandoverCarList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                notHandoverCarList: [...state.data.notHandoverCarList, ...notHandoverCarList],
                isComplete
            },
            getNotHandoverCarListMore: {
                ...initialState.getNotHandoverCarListMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarListMore_waiting]: (state, action) => {
        return {
            ...state,
            getNotHandoverCarListMore: {
                ...initialState.getNotHandoverCarListMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getNotHandoverCarListMore: {
                ...initialState.getNotHandoverCarListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.notHandoverList.get_notHandoverCarListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getNotHandoverCarListMore: {
                ...initialState.getNotHandoverCarListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)