import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, InteractionManager, StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Card, CardItem, Body, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'

const renderItem = props => {
    const { sceneKey, item, item: { vin = '', route_start = '', route_end = '', dp_route_task_id = '', make_name = '', drive_name = '', truck_num = '', r_short_name = '', e_short_name = '' } } = props
    // console.log('item', item)
    return (
        <TouchableOpacity onPress={() => Actions.notHandoverDetail({ previousViewName: sceneKey, notHandoverCar: item })}>
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
                        <Text style={[globalStyles.smallText]}>委托方：{e_short_name}</Text>
                        <Text style={[globalStyles.smallText]}>经销商：{r_short_name}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.smallText]}>调度编号：{dp_route_task_id}</Text>
                        <Text style={[globalStyles.smallText]}>{route_start} -> {route_end}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.smallText]}>司机:{drive_name}</Text>
                        <Text style={[globalStyles.smallText]}>货车牌号：{truck_num}</Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无未交接车辆</Text>
        </View>
    )
}


class NotHandoverList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getNotHandoverCarListWaiting, getNotHandoverCarList } = this.props
        getNotHandoverCarListWaiting()
        InteractionManager.runAfterInteractions(getNotHandoverCarList)
    }

    render() {
        const { sceneKey, notHandoverListRecuer, notHandoverListRecuer: { data: { notHandoverCarList, isComplete }, getNotHandoverCarList }, getNotHandoverCarListMore } = this.props
        if (getNotHandoverCarList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                        data={notHandoverCarList}
                        onEndReachedThreshold={0.2}
                        removeClippedSubviews={true}
                        onEndReached={() => {
                            if (getNotHandoverCarList.isResultStatus == 2 && !isComplete) {
                                getNotHandoverCarListMore()
                            }
                        }}
                        renderItem={({ item }) => renderItem({ item, sceneKey })}
                        ListFooterComponent={notHandoverListRecuer.getNotHandoverCarListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                        ListEmptyComponent={renderEmpty} />
                </Container>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        notHandoverListRecuer: state.notHandoverListRecuer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getNotHandoverCarList: () => {
        dispatch(reduxActions.notHandoverList.getNotHandoverCarList())
    },
    getNotHandoverCarListWaiting: () => {
        dispatch(reduxActions.notHandoverList.getNotHandoverCarListWaiting())
    },
    getNotHandoverCarListMore: () => {
        dispatch(reduxActions.notHandoverList.getNotHandoverCarListMore())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotHandoverList)


const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})
