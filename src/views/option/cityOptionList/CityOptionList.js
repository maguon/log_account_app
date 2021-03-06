import React from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Container, Spinner, ListItem, Icon, Right, Left } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { selectedItemFilter, highLightFilter } from '../utils'
import { getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无城市</Text>
        </View>
    )
}

const CityOptionList = props => {
    const { cityOptionListReducer: { data: { cityOptionList }, getCityOptionList }, onSelect, selectedItem, cleanSelected, optionalSearchFormValues } = props
    let list = cityOptionList
    if (selectedItem) {
        list = selectedItemFilter(cityOptionList, selectedItem, 'id')
    }
    if (optionalSearchFormValues && optionalSearchFormValues.keyword) {
        list = highLightFilter(list, optionalSearchFormValues.keyword, 'city_name')
    }
    if (getCityOptionList.isResultStatus == 1) {
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
                                    if (!item.isSelectedItem) {
                                        onSelect(item)
                                    }
                                }}>
                                <Left>
                                    {optionalSearchFormValues && optionalSearchFormValues.keyword && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.highLightfield.first.isHighLight && <Text style={globalStyles.styleColor}>{item.highLightfield.first.str}</Text>}
                                        {!item.highLightfield.first.isHighLight && <Text>{item.highLightfield.first.str}</Text>}
                                        {item.highLightfield.middle.isHighLight && <Text style={globalStyles.styleColor}>{item.highLightfield.middle.str}</Text>}
                                        {!item.highLightfield.middle.isHighLight && <Text>{item.highLightfield.middle.str}</Text>}
                                        <Text>{item.highLightfield.last.str}</Text>
                                    </Text>}
                                    {(!optionalSearchFormValues || !optionalSearchFormValues.keyword) && <Text style={[globalStyles.midTextNoColor, item.isSelectedItem ? { color: '#188df2' } : {}]}>
                                        {item.city_name}
                                    </Text>}
                                </Left>
                                {item.isSelectedItem && <Right>
                                    <TouchableOpacity onPress={() => {
                                        Actions.refresh({ selectedItem: null })
                                        cleanSelected()
                                    }}>
                                        <Icon name='ios-close-circle' style={{ color: '#188df2' }} />
                                    </TouchableOpacity >
                                </Right>}
                            </ListItem>
                        )
                    }}
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
        cityOptionListReducer: state.cityOptionListReducer,
        optionalSearchFormValues: getFormValues('optionalSearchForm')(state)
    }
}

export default connect(mapStateToProps)(CityOptionList)