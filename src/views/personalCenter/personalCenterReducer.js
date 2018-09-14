import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    updatePersonalImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(actionTypes.personalCenter.Update_PersonalImage_SUCCESS)]: (state, action) => {
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.personalCenter.Update_PersonalImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.personalCenter.Update_PersonalImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.personalCenter.Update_PersonalImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            updatePersonalImage: {
                ...initialState.updatePersonalImage,
                isResultStatus: 1
            }
        }
    },

}, initialState)