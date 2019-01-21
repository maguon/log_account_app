import React, { Component } from 'react'
import { Text, Image, View, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import { Container, Content, Spinner } from 'native-base'
import CameraButton from '../../../components/share/CameraButton'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'


class HandOverImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    render() {
        const { handOver: { handove_image }, uploadHandoveImage, uploadHandoveImageWaiting, handOverImageReducer } = this.props
        const { communicationSettingReducer: { data: { file_host } } } = this.props
        return (
            <Container>
                <Content>
                    <View style={{ width: 150, height: 267, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginVertical: 15, borderWidth: 0.5, borderColor: '#ddd' }}>
                        {handove_image && <Image
                            style={{ width: 150, height: 267 }}
                            source={{ uri: `${file_host}/image/${handove_image}` }}
                            onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                            LonLoad={() => { this.setState({ spinnerDisplay: false }) }}
                            onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }} />}
                        {handove_image && <Spinner
                            animating={this.state.spinnerDisplay}
                            style={{ position: 'absolute', alignSelf: 'center' }}
                            color={styleColor}
                        />}
                        {!handove_image && <Text style={globalStyles.midText}>暂无图片</Text>}
                    </View>
                    <CameraButton
                        getImage={param => uploadHandoveImage({ cameraReses: param })}
                        _cameraStart={uploadHandoveImageWaiting} />
                </Content>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={handOverImageReducer.uploadHandoveImage.isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={handOverImageReducer.uploadHandoveImage.isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large" />
                            <Text style={[globalStyles.midText, styles.modalText]}>正在上传图片...</Text>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})


//const { communicationSettingReducer: { data: { base_host, file_host,record_host } } } = getState() 

const mapStateToProps = (state, ownProps) => {
    return {
        handOverImageReducer: state.handOverImageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    uploadHandoveImage: param => {
        const { handOver } = ownProps
        dispatch(reduxActions.handOverImage.uploadHandoveImage({ settleHandoverId: handOver.id, ...param }))
    },
    uploadHandoveImageWaiting: () => {
        dispatch(reduxActions.handOverImage.uploadHandoveImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HandOverImage)