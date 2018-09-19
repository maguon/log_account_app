import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Container, Button, Card, CardItem, Body, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { connect } from 'react-redux'
import * as routerDirection from '../../../utils/RouterDirection'
import * as reduxActions from '../../../reduxActions'

const renderItem = props => {
    const { item: { vin = '', drive_name = '', truck_num = '', route_start = '', route_end = '', make_name = '', dp_route_task_id = '', car_id }, delCar } = props
    // console.log('props', props)
    return (
        <Card>
            <CardItem header bordered style={{ backgroundColor: '#eee', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingLeft: 5 }]}>vin:{vin}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>{make_name}</Text>
                </View>
            </CardItem>
            <CardItem bordered style={{ flexDirection: 'column' }}>
                <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.smallText]}>调度编号：{`${dp_route_task_id}`}</Text>
                    <Text style={[globalStyles.smallText]}>{route_start} -> {route_end}</Text>
                </Body>
                <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.smallText]}>司机：{drive_name}</Text>
                    <Text style={[globalStyles.smallText]}>货车牌号：{truck_num}</Text>
                </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'flex-end' }}>
                <Button small onPress={() => delCar({ carId: car_id })} style={{ backgroundColor: '#db6c6d' }}>
                    <Text style={{ color: '#fff', paddingHorizontal: 15 }}>删除</Text>
                </Button>
            </CardItem>
        </Card>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无交接车辆</Text>
        </View>
    )
}

const HandOverCarList = props => {
    const { handOverCarListReducer: { data: { carList }, getHandOverCarList }, sceneKey, parent, delCar, addCar, handOver,
        handOver: { r_short_name = '', short_name = '' } } = props
    // console.log('props', props)
    if (getHandOverCarList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <View style={{ backgroundColor: '#eee' }}>
                    <View style={{ backgroundColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingVertical: 15 }]}>委托方：{short_name}</Text>
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingVertical: 15 }]}>经销商：{r_short_name}</Text>
                    </View>
                    <Button small style={{ backgroundColor: styleColor, alignSelf: 'flex-end', marginBottom: 15, marginHorizontal: 15 }} onPress={() => routerDirection.carOptionList(parent, sceneKey)({ onSelect: addCar, entrustId: handOver.entrust_id, receiveId: handOver.receive_id })}>
                        <Text style={{ color: '#fff', paddingHorizontal: 15 }}>填加车辆</Text>
                    </Button>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    data={carList}
                    renderItem={({ item }) => renderItem({ item, delCar })}
                    ListEmptyComponent={renderEmpty} />
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    }
})


const mapStateToProps = (state) => {
    return {
        handOverCarListReducer: state.handOverCarListReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addCar: param => {
        const { handOver } = ownProps
        dispatch(reduxActions.handOverCarList.addCar({ settleHandoverId: handOver.id, ...param }))
    },
    delCar: param => {
        const { handOver } = ownProps
        dispatch(reduxActions.handOverCarList.delCar({ settleHandoverId: handOver.id, ...param }))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(HandOverCarList)