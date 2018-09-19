import React from 'react'
import { Text } from 'react-native'
import { Container, Content, ListItem, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { destroy } from 'redux-form'

const NotHandoverDetail = props => {
    const { car: { vin = '', route_start = '', route_end = '', dp_route_task_id = '', make_name = '',
        drive_name = '', truck_num = '', r_short_name = '' }, car, returnViewName, cleanCarOptionList, onSelect } = props
    return (
        <Container>
            <Content>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>vin</Text>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>{vin}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>品牌</Text>
                    <Text style={[globalStyles.midText]}>{make_name}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>起始城市</Text>
                    <Text style={[globalStyles.midText]}>{route_start}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>目的城市</Text>
                    <Text style={[globalStyles.midText]}>{route_end}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>经销商</Text>
                    <Text style={[globalStyles.midText]}>{r_short_name}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>调度编号</Text>
                    <Text style={[globalStyles.midText]}>{dp_route_task_id}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>司机</Text>
                    <Text style={[globalStyles.midText]}>{drive_name}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>货车</Text>
                    <Text style={[globalStyles.midText]}>{truck_num}</Text>
                </ListItem>
                <Button full style={{ margin: 15, backgroundColor: styleColor }} onPress={() => {
                    cleanCarOptionList()
                    onSelect(car)
                    Actions.popTo(returnViewName)
                }}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanCarOptionList: () => {
        dispatch(reduxActions.carOptionList.cleanCarOptionList())
        dispatch(destroy('carOptionalSearchForm'))
    }
})

export default connect(null, mapDispatchToProps)(NotHandoverDetail)
