import * as httpRequest from '../../../utils/HttpRequest'
import { base_host, file_host } from '../../../configs/Host'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { objectExceptNull } from '../../../utils'
import { ToastAndroid } from 'react-native'


export const uploadHandoveImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, settleHandoverId } = param
        // console.log('param', param)
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user: { uid } } } } = getState()
            const imageUploadUrl = `${file_host}/user/${uid}/image?imageType=7`
            // console.log('imageUploadUrl', imageUploadUrl)
            const imageUploadReses = await httpRequest.postFile(imageUploadUrl, { key: 'image', ...cameraSuccessReses[0].res })
            // console.log('imageUploadReses', imageUploadReses)
            if (imageUploadReses.success) {
                const url = `${base_host}/user/${uid}/settleHandover/${settleHandoverId}/image`
                // console.log('url', url)
                const res = await httpRequest.put(url, objectExceptNull({
                    handoveImage: imageUploadReses.imageId
                }))
                // console.log('res', res)
                if (res.success) {
                    dispatch({ type: reduxActionTypes.handOverList.modify_handOver, payload: { handOver: { settleHandoverId, handove_image: imageUploadReses.imageId } } })
                    dispatch({ type: reduxActionTypes.handOverListForHome.modify_handOverForHome, payload: { handOver: { settleHandoverId, handove_image: imageUploadReses.imageId } } })
                    dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_success, payload: {} })
                    ToastAndroid.show('照片上传成功！', 10)
                } else {
                    ToastAndroid.show('照片上传失败！', 10)
                    dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_failed, payload: { failedMsg: res.msg } })
                }
            } else {
                ToastAndroid.show('照片上传失败！', 10)
                dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_failed, payload: { failedMsg: res.msg } })
            }
        } else {
            ToastAndroid.show('照片上传失败！', 10)
            dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        // console.log('err', err)
        ToastAndroid.show('照片上传失败！', 10)
        dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_error, payload: { errorMsg: res.msg } })
    }
}

export const uploadHandoveImageWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.handOverImage.upload_handoverImage_waiting, payload: {} })
}