import React from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Container, Spinner, ListItem, Icon, Right, Left } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { highLightFilter } from '../utils'
import { getFormValues } from 'redux-form'
import * as routerDirection from '../../../utils/RouterDirection'
import { Actions } from 'react-native-router-flux'

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无该车辆</Text>
        </View>
    )
}

const renderEmptyWarn = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>请输入至少6位vin</Text>
        </View>
    )
}

const CarOptionList = props => {
    const { carOptionListReducer: { data: { carOptionList }, getCarOptionList }, optionalSearchFormValues, parent, sceneKey, previousViewName,onSelect } = props
    console.log('props', props)
    let list = carOptionList
    if (optionalSearchFormValues && optionalSearchFormValues.keyword) {
        list = highLightFilter(list, optionalSearchFormValues.keyword, 'vin')
    }

    if (getCarOptionList.isResultStatus == 1) {
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
                    data={list}
                    renderItem={({ item, index }) => {
                        return (
                            <ListItem key={index}
                                onPress={() => {
                                    routerDirection.carOptionInfo(parent, sceneKey)({ car: item, returnViewName: previousViewName,onSelect })
                                }}>
                                <Left>
                                    {optionalSearchFormValues && optionalSearchFormValues.keyword && <Text style={[globalStyles.midText]}>
                                        {item.highLightfield.first.isHighLight && <Text style={globalStyles.styleColor}>{item.highLightfield.first.str}</Text>}
                                        {!item.highLightfield.first.isHighLight && <Text>{item.highLightfield.first.str}</Text>}
                                        {item.highLightfield.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.highLightfield.middle.str}</Text>}
                                        {!item.highLightfield.middle.isHighLight && <Text>{item.highLightfield.middle.str}</Text>}
                                        <Text>{item.highLightfield.last.str}</Text>
                                    </Text>}
                                    {(!optionalSearchFormValues || !optionalSearchFormValues.keyword) && <Text style={[globalStyles.midTextNoColor]}>
                                        {item.vin}
                                    </Text>}
                                </Left>
                                <Right>
                                    <Text style={[globalStyles.midText]}>{item.make_name}</Text>
                                </Right>
                            </ListItem>
                        )
                    }}
                    ListEmptyComponent={optionalSearchFormValues && optionalSearchFormValues.keyword.length >= 6 ? renderEmpty : renderEmptyWarn} />
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
    },
    item: {
        marginLeft: 15,
        paddingRight: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        carOptionListReducer: state.carOptionListReducer,
        optionalSearchFormValues: getFormValues('carOptionalSearchForm')(state)
    }
}


export default connect(mapStateToProps)(CarOptionList)