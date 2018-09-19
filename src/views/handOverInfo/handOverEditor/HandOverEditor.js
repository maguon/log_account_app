import React from 'react'
import { Text, View } from 'react-native'
import { Container, Content, ListItem, Button } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import { DatePicker, RichTextBox, TextBox } from '../../../components/form'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import moment from 'moment'

const HandOverEditor = props => {
    const { isCreate, handOver, handleSubmit ,nextStep} = props
    console.log('nextStep',nextStep)
    return (
        <Container>
            <Content>
                <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>交接单编号：{handOver && handOver.number ? `${handOver.number}` : ''}</Text>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>委托方：{handOver && handOver.short_name ? `${handOver.short_name}` : ''}</Text>
                </ListItem>
                <Field name='serialNumber' label='序号' component={TextBox} />
                <Field name='receivedDate' label='交接单收到日期' component={DatePicker} />
                <Field name='remark' label='备注' component={RichTextBox} />
                {!isCreate && <Button full style={{ margin: 15, backgroundColor: styleColor }} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                </Button>}
                {isCreate && <View style={{ margin: 7.5, flexDirection: 'row' }}>
                    <Button style={{ margin: 7.5, flex: 1, backgroundColor: styleColor, justifyContent: 'center' }} onPress={handleSubmit}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                    </Button>
                    <Button style={{ margin: 7.5, flex: 1, backgroundColor: styleColor, justifyContent: 'center' }} onPress={()=>{
                        // handleSubmit()
                        nextStep(1)
                    }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>下一步</Text>
                    </Button>
                </View>}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { handOver } = ownProps
    return {
        initialValues: {
            serialNumber: handOver && handOver.serial_number ? `${handOver.serial_number}` : '',
            receivedDate: handOver && handOver.received_date ? moment(`${handOver.received_date}`).format('YYYY-MM-DD') : '',
            remark: handOver && handOver.remark ? handOver.remark : ''
        }
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'handOverEditorForm',
    onSubmit: (values, dispatch, props) => {
        const { handOver } = props
        dispatch(reduxActions.handOverEditor.modifyHandover({ ...values, settleHandoverId: handOver.id, entrustId: handOver.entrust_id }))
    }
})(HandOverEditor))