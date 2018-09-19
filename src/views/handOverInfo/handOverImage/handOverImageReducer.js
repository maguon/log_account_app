import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    uploadHandoveImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [reduxActionTypes.handOverImage.upload_handoverImage_success]: (state, action) => {
        return {
            ...state,
            uploadHandoveImage: {
                ...initialState.uploadHandoveImage,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.handOverImage.upload_handoverImage_waiting]: (state, action) => {
        return {
            ...state,
            uploadHandoveImage: {
                ...initialState.uploadHandoveImage,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.handOverImage.upload_handoverImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadHandoveImage: {
                ...initialState.uploadHandoveImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.handOverImage.upload_handoverImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadHandoveImage: {
                ...initialState.uploadHandoveImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)