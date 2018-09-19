import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'


const initialState = {
    data: {
        carOptionList: [],
    },
    getCarOptionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.carOptionList.get_carOptionList_success]: (state, action) => {
        const { payload: { carOptionList } } = action
        return {
            ...state,
            data: {
                carOptionList
            },
            getCarOptionList: {
                ...state.getCarOptionList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.carOptionList.get_carOptionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarOptionList: {
                ...state.getCarOptionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.carOptionList.get_carOptionList_waiting]: (state, action) => {
        return {
            ...state,
            getCarOptionList: {
                ...state.getCarOptionList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.carOptionList.get_carOptionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarOptionList: {
                ...state.getCarOptionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.carOptionList.clean_carOptionList]: (state, action) => {
        return {
            ...initialState
        }
    }

}, initialState)