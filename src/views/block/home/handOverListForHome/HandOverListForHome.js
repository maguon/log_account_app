import React from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Body, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../../style/GlobalStyles'
import * as routerDirection from '../../../../utils/RouterDirection'
import * as reduxActions from '../../../../reduxActions'
import { connect } from 'react-redux'
import moment from 'moment'

const renderItem = props => {
    const { parent, sceneKey, item: { received_date, number = '', r_short_name = '', short_name = '' } } = props
    return (
        <TouchableOpacity onPress={() => routerDirection.handOverInfo(parent, sceneKey)()}>
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


const HandOverListForHome = props => {
    const { sceneKey, parent, handOverListForHomeRecuer: { data: { handoverList, isComplete }, getHandoverListForHome },
        handOverListForHomeRecuer, getHandOverListForHomeMore } = props
    if (getHandoverListForHome.isResultStatus == 1) {
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
                        if (getHandoverListForHome.isResultStatus == 2 && !isComplete) {
                            getHandOverListForHomeMore()
                        }
                    }}
                    renderItem={({ item }) => renderItem({ item, sceneKey, parent })}
                    ListFooterComponent={handOverListForHomeRecuer.getHandoverListForHomeMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    ListEmptyComponent={renderEmpty} />
            </Container>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        handOverListForHomeRecuer: state.handOverListForHomeRecuer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHandOverListForHomeMore: () => {
        dispatch(reduxActions.handOverListForHome.getHandOverListForHomeMore())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(HandOverListForHome)


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
