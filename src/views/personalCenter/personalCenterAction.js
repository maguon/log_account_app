import httpRequest from '../../../util/HttpRequest'
import { base_host, file_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const updatePersonalImage = (param) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_WAITING, payload: {} })
        const uploadUrl = `${file_host}/user/${param.uploadImage.requiredParam.userId}/image?${ObjectToUrl(param.uploadImage.optionalParam)}`
        const uploadUrlRes = await httpRequest.postFile(uploadUrl, param.uploadImage.postParam)
        if (uploadUrlRes.success) {
            const updateAvatarImageUrl = `${base_host}/user/${param.updateAvatarImage.requiredParam.userId}/avatarImage`
            param.updateAvatarImage.putParam.avatarImage = uploadUrlRes.imageId
            const updateAvatarImageRes = await httpRequest.put(updateAvatarImageUrl, param.updateAvatarImage.putParam)
            if (updateAvatarImageRes.success) {
                dispatch({ type: actionTypes.loginTypes.change_AvatarImage, payload: { avatar_image: uploadUrlRes.imageId } })
                dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_SUCCESS, payload: {} })
                ToastAndroid.show(`修改成功！`, 10)
            } else {
                dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_FAILED, payload: { failedMsg: updateAvatarImageRes.msg } })
                ToastAndroid.show(`修改失败！${updateAvatarImageRes.msg}`, 10)
            }
        } else {
            dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_FAILED, payload: { failedMsg: uploadUrlRes.msg } })
            ToastAndroid.show(`修改失败！${uploadUrlRes.msg}`, 10)
        }
    } catch (err) {
        dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_ERROR, payload: { errorMsg: err } })
        ToastAndroid.show(`修改失败！${err}`, 10)
    }
}