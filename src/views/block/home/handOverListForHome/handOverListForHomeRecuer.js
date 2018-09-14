import * as reduxActionTypes from '../../../../reduxActionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    data: {
        handoverList: [],
        search: null,
        isCompaled: false
    },
    getHandoverListForHome: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getHandoverListForHomeMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.handOverListForHome.get_handOverListForHome_success]: (state, action) => {
        const { payload: { handoverList, isComplete, search } } = action
        return {
            ...state,
            data: {
                handoverList,
                isComplete,
                search
            },
            getHandoverListForHome: {
                ...state.getHandoverListForHome,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHome_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandoverListForHome: {
                ...state.getHandoverListForHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHome_waiting]: (state, action) => {
        return {
            ...state,
            getHandoverListForHome: {
                ...state.getHandoverListForHome,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHome_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandoverListForHome: {
                ...state.getHandoverListForHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_success]: (state, action) => {
        const { payload: { handoverList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                handoverList: [...state.data.handoverList, ...handoverList],
                isComplete
            },
            getHandoverListForHomeMore: {
                ...initialState.getHandoverListForHomeMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_waiting]: (state, action) => {
        return {
            ...state,
            getHandoverListForHomeMore: {
                ...initialState.getHandoverListForHomeMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandoverListForHomeMore: {
                ...initialState.getHandoverListForHomeMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverListForHome.get_handOverListForHomeMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandoverListForHomeMore: {
                ...initialState.getHandoverListForHomeMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)