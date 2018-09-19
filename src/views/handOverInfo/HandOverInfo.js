import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { Container, Tab, Tabs, Button, Text } from 'native-base'
import HandOverCarList from './handOverCarList/HandOverCarList'
import HandOverEditor from './handOverEditor/HandOverEditor'
import HandOverImage from './handOverImage/HandOverImage'
import globalStyles from '../../style/GlobalStyles'
import { connect } from 'react-redux'



class HandOverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
        this.nextStep = this.nextStep.bind(this)
    }


    nextStep(page) {
        InteractionManager.runAfterInteractions(() => this.setState({ page: page }))
    }


    render() {
        const { isCreate = false, handOver, sceneKey, parent } = this.props
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <Tabs page={this.state.page} >
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                        heading="基本信息">
                        <HandOverEditor isCreate={isCreate} handOver={handOver} nextStep={this.nextStep} />
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                        heading="交接车辆">
                        <HandOverCarList isCreate={isCreate} handOver={handOver} parent={parent} sceneKey={sceneKey} />
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                        heading="照片">
                        <HandOverImage isCreate={isCreate} handOver={handOver} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { isHome, settleHandoverId } = ownProps
    let handOver = {}
    if (isHome) {
        handOver = state.handOverListForHomeRecuer.data.handoverList.find(item => item.id == settleHandoverId)
    } else {
        handOver = state.handOverListRecuer.data.handoverList.find(item => item.id == settleHandoverId)
    }
    return {
        handOver
    }
}

export default connect(mapStateToProps)(HandOverInfo)