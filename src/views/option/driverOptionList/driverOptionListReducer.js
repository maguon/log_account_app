import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'


const initialState = {
    data: {
        driverOptionList: [],
    },
    getDriverOptionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.driverOptionList.get_driverOptionList_success]: (state, action) => {
        const { payload: { driverOptionList } } = action
        return {
            ...state,
            data: {
                driverOptionList
            },
            getDriverOptionList: {
                ...state.getDriverOptionList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.driverOptionList.get_driverOptionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDriverOptionList: {
                ...state.getDriverOptionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.driverOptionList.get_driverOptionList_waiting]: (state, action) => {
        return {
            ...state,
            getDriverOptionList: {
                ...state.getDriverOptionList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.driverOptionList.get_driverOptionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDriverOptionList: {
                ...state.getDriverOptionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)