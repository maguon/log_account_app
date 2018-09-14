import React from 'react'
import { Text } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import moment from 'moment'

const NotHandoverDetail = props => {
    const { notHandoverCar: { vin = '', route_start = '', route_end = '', dp_route_task_id = '', make_name = '',
        drive_name = '', truck_num = '', r_short_name = '', e_short_name = '', date_id, arrive_date, task_plan_date } } = props
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
                    <Text style={[globalStyles.midText]}>委托方</Text>
                    <Text style={[globalStyles.midText]}>{e_short_name}</Text>
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
                    <Text style={[globalStyles.midText]}>指令日期</Text>
                    <Text style={[globalStyles.midText]}>{date_id ? moment(`${date_id}`).format('YYYY-MM-DD') : ''}</Text>
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
                    <Text style={[globalStyles.midText]}>司机</Text>
                    <Text style={[globalStyles.midText]}>{drive_name}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>货车</Text>
                    <Text style={[globalStyles.midText]}>{truck_num}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>计划执行时间</Text>
                    <Text style={[globalStyles.midText]}>{task_plan_date ? moment(task_plan_date).format('YYYY-MM-DD') : ''}</Text>
                </ListItem>
                <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText]}>送达时间</Text>
                    <Text style={[globalStyles.midText]}>{arrive_date ? moment(arrive_date).format('YYYY-MM-DD HH:mm') : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )
}

export default NotHandoverDetail
