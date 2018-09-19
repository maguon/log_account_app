import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    data: {
        handoverList: [],
        search: null,
        isCompaled: false
    },
    getHandoverList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getHandoverListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.handOverList.get_handOverList_success]: (state, action) => {
        const { payload: { handoverList, isComplete, search } } = action
        return {
            ...state,
            data: {
                handoverList,
                isComplete,
                search
            },
            getHandoverList: {
                ...state.getHandoverList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandoverList: {
                ...state.getHandoverList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverList_waiting]: (state, action) => {
        return {
            ...state,
            getHandoverList: {
                ...state.getHandoverList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandoverList: {
                ...state.getHandoverList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.handOverList.get_handOverListMore_success]: (state, action) => {
        const { payload: { handoverList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                handoverList: [...state.data.handoverList, ...handoverList],
                isComplete
            },
            getHandoverListMore: {
                ...initialState.getHandoverListMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverListMore_waiting]: (state, action) => {
        return {
            ...state,
            getHandoverListMore: {
                ...initialState.getHandoverListMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandoverListMore: {
                ...initialState.getHandoverListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverList.get_handOverListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandoverListMore: {
                ...initialState.getHandoverListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.handOverList.add_handOver_success]: (state, action) => {
        const { payload: { handOver } } = action
        return {
            ...state,
            data: {
                ...state.data,
                handoverList: [handOver, ...state.data.handoverList]
            }
        }
    },


    [reduxActionTypes.handOverList.modify_handOver]: (state, action) => {
        const { payload: { handOver } } = action
        return {
            ...state,
            data: {
                ...state.data,
                handoverList: state.data.handoverList.map(item => {
                    if (item.id == handOver.settleHandoverId) {
                        return {
                            ...item,
                            ...handOver
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    }

}, initialState)