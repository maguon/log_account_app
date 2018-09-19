import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        carList: []
    },
    getHandOverCarList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    addCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [reduxActionTypes.handOverCarList.get_handOverCarList_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            ...state,
            data: {
                carList
            },
            getHandOverCarList: {
                ...initialState.getHandOverCarList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverCarList.get_handOverCarList_waiting]: (state, action) => {
        return {
            ...state,
            getHandOverCarList: {
                ...initialState.getHandOverCarList,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.handOverCarList.get_handOverCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHandOverCarList: {
                ...initialState.getHandOverCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverCarList.get_handOverCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHandOverCarList: {
                ...initialState.getHandOverCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)