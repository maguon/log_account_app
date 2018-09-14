import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { Container, Button, Card, CardItem, Body } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'

const renderItem = props => {
    return (
        <Card>
            <CardItem header bordered style={{ backgroundColor: '#eee', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingLeft: 5 }]}>vin:12345678901234567</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>一汽大众</Text>
                </View>
            </CardItem>
            <CardItem bordered style={{ flexDirection: 'column' }}>
                <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.smallText]}>调度编号：123456</Text>
                    <Text style={[globalStyles.smallText]}>大连 -> 沈阳</Text>
                </Body>
                <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.smallText]}>司机：王宝泉</Text>
                    <Text style={[globalStyles.smallText]}>货车牌号：辽B12345</Text>
                </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'space-between' }}>
                <Text style={[globalStyles.smallText]}>经销商：沈阳泰德</Text>
                <Button small style={{ backgroundColor: '#db6c6d' }}>
                    <Text style={{ color: '#fff', paddingHorizontal: 15 }}>删除</Text>
                </Button>
            </CardItem>
        </Card>
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无交接车辆</Text>
        </View>
    )
}


const HandOverCarList = props => {

    return (
        <Container>
            <View style={{ backgroundColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <Text style={[globalStyles.midText, { paddingVertical: 15 }]}>委托方：安吉迅达</Text>
                <Button small style={{ backgroundColor: styleColor, alignSelf: 'center' }}>
                    <Text style={{ color: '#fff', paddingHorizontal: 15 }}>填加车辆</Text>
                </Button>
            </View>
            <FlatList
                keyExtractor={(item, index) => index}
                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                data={[1, 2, 3, 4]}
                renderItem={renderItem}
                // ListFooterComponent={<ListFooterComponent />}
                ListEmptyComponent={renderEmpty} />
        </Container>
    )
}

export default HandOverCarList