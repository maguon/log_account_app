import React from 'react'
import { Text } from 'react-native'
import { Container, Tab, Tabs, Spinner } from 'native-base'
import HandOverCarList from './handOverCarList/HandOverCarList'
import HandOverEditor from './handOverEditor/HandOverEditor'
import HandOverImage from './handOverImage/HandOverImage'
import globalStyles from '../../style/GlobalStyles'

const HandOverInfo = props => {
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="基本信息">
                    <HandOverEditor />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="交接车辆">
                    <HandOverCarList />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: 'rgba(255, 255, 255, 0.4)' }]}
                    heading="照片">
                    <HandOverImage />
                </Tab>
            </Tabs>
        </Container>

    )
}

export default HandOverInfo