import * as reduxActionTypes from '../../reduxActionTypes'
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'
import { ToastAndroid } from 'react-native'



export const saveCommunicationSetting = param => (dispatch) => {
    const { url } = param
    localStorage.save({
        key: localStorageKey.SERVERADDRESS,
        data: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
        }
    })
    dispatch({ 
        type: reduxActionTypes.communicationSetting.save_communicationSetting_success, payload: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
    }})
}