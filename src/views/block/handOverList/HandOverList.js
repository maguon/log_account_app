import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Card, CardItem, Body, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import * as routerDirection from '../../../utils/RouterDirection'
import * as reduxActions from '../../../reduxActions'
import { connect } from 'react-redux'
import moment from 'moment'

const renderItem = props => {
    const { parent, sceneKey, getHandOverCarListWaiting, getHandOverCarList, item: { received_date, number = '', r_short_name = '', short_name = '', id } } = props
    return (
        <TouchableOpacity onPress={() => {
            getHandOverCarListWaiting()
            routerDirection.handOverInfo(parent, sceneKey)({ isHome: false, settleHandoverId: id })
            InteractionManager.runAfterInteractions(() => getHandOverCarList({ settleHandoverId: id }))
        }}>
            <Card>
                <CardItem header bordered style={{ backgroundColor: '#eee', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-paper' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                        <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingLeft: 5 }]}>{`${number}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-time' style={{ fontSize: 18, color: '#aaa' }} />
                        <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>{received_date ? moment(`${received_date}`).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                </CardItem>
                <CardItem bordered>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.smallText]}>委托方：{short_name}</Text>
                        <Text style={[globalStyles.smallText]}>经销商：{r_short_name}</Text>
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无交接单记录</Text>
        </View>
    )
}

class HandOverList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getHandOverListWaiting, getHandOverList } = this.props
        getHandOverListWaiting()
        InteractionManager.runAfterInteractions(getHandOverList)
    }

    render() {
        const { sceneKey, parent, handOverListRecuer: { data: { handoverList, isComplete }, getHandoverList },
            handOverListRecuer, getHandOverListMore, getHandOverCarListWaiting, getHandOverCarList } = this.props
        if (getHandoverList.isResultStatus == 1) {
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
                        data={handoverList}
                        onEndReachedThreshold={0.2}
                        removeClippedSubviews={true}
                        onEndReached={() => {
                            if (getHandoverList.isResultStatus == 2 && !isComplete) {
                                getHandOverListMore()
                            }
                        }}
                        renderItem={({ item }) => renderItem({ item, sceneKey, parent, getHandOverCarListWaiting, getHandOverCarList })}
                        ListFooterComponent={handOverListRecuer.getHandoverListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                        ListEmptyComponent={renderEmpty} />
                </Container>
            )
        }
    }
}




const mapStateToProps = (state) => {
    return {
        handOverListRecuer: state.handOverListRecuer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHandOverListMore: () => {
        dispatch(reduxActions.handOverList.getHandOverListMore())
    },
    getHandOverList: () => {
        dispatch(reduxActions.handOverList.getHandOverList())
    },
    getHandOverListWaiting: () => {
        dispatch(reduxActions.handOverList.getHandOverListWaiting())
    },
    getHandOverCarList: param => {
        console.log('getHandOverCarList')

        dispatch(reduxActions.handOverCarList.getHandOverCarList(param))
    },
    getHandOverCarListWaiting: () => {
        console.log('getHandOverCarListWaiting')
        dispatch(reduxActions.handOverCarList.getHandOverCarListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(HandOverList)


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
