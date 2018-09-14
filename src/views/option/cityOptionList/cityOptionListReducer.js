import * as reduxActionTypes from '../../../reduxActionTypes'
import { handleActions } from 'redux-actions'


const initialState = {
    data: {
        cityOptionList: [],
    },
    getCityOptionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [reduxActionTypes.cityOptionList.get_cityOptionList_success]: (state, action) => {
        const { payload: { cityOptionList } } = action
        return {
            ...state,
            data: {
                cityOptionList
            },
            getCityOptionList: {
                ...state.getCityOptionList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.cityOptionList.get_cityOptionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCityOptionList: {
                ...state.getCityOptionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.cityOptionList.get_cityOptionList_waiting]: (state, action) => {
        return {
            ...state,
            getCityOptionList: {
                ...state.getCityOptionList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.cityOptionList.get_cityOptionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCityOptionList: {
                ...state.getCityOptionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)