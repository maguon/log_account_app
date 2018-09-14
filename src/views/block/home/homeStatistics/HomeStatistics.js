import React from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../../../style/GlobalStyles'
import { connect } from 'react-redux'

const HomeStatistics = props => {
    const { homeStatisticsRecuer: { data: { handoverStatistics: { settle_handover_count = '0', car_count = '0' } }, getHandoverStatistics } } = props 
    return (
        <View style={[globalStyles.styleBackgroundColor, { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderTopWidth: 0.5, borderTopColor: '#fff' }]}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', margin: 10 }}>
                <Icon name='ios-paper' style={{ color: '#fff' }} />
                <View>
                    <Text style={[globalStyles.smallText, { color: '#fff' }]}>本月交接单</Text>
                    {getHandoverStatistics.isResultStatus == 1 && <Text style={[globalStyles.midText, { color: '#fff' }]}>----</Text>}
                    {getHandoverStatistics.isResultStatus != 1 && <Text style={[globalStyles.midText, { color: '#fff' }]}>{settle_handover_count}</Text>}
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, margin: 10, borderLeftWidth: 0.5, borderLeftColor: '#fff' }}>
                <Icon name='ios-car' style={{ color: '#fff' }} />
                <View>
                    <Text style={[globalStyles.smallText, { color: '#fff' }]}>本月交接车辆</Text>
                    {getHandoverStatistics.isResultStatus == 1 && <Text style={[globalStyles.midText, { color: '#fff' }]}>----</Text>}
                    {getHandoverStatistics.isResultStatus != 1 && <Text style={[globalStyles.midText, { color: '#fff' }]}>{car_count}</Text>}
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        homeStatisticsRecuer: state.homeStatisticsRecuer
    }
}

export default connect(mapStateToProps)(HomeStatistics)