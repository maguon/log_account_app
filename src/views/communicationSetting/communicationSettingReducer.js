import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        base_host: null,
        file_host: null,
        record_host: null,
        host: null
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(reduxActionTypes.communicationSetting.get_communicationSetting_success)]: (state, action) => {
        const { payload: { base_host, file_host, record_host, host } } = action
        return {
            data: {
                base_host, file_host, record_host, host
            }
        }
    },
    [(reduxActionTypes.communicationSetting.save_communicationSetting_success)]: (state, action) => {
        const { payload: { base_host, file_host, record_host, host } } = action
        return {
            data: {
                base_host, file_host, record_host, host
            }
        }
    }
}, initialState)
