import React from 'react'
import { Text } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import { DatePicker, RichTextBox,TextBox} from '../../../components/form'
import globalStyles from '../../../style/GlobalStyles'


const HandOverEditor = props => {
    return (
        <Container>
            <Content>
                <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>交接单编号：201001</Text>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>委托方：安吉迅达</Text>
                </ListItem>
                <Field name='serial_number' label='序号' component={TextBox} />
                <Field name='accidentDate' label='交接单收到日期' component={DatePicker} />
                <Field name='accidentExplain' label='备注' component={RichTextBox} />
            </Content>
        </Container>
    )
}

export default reduxForm({
    form: 'handOverEditorForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('onSubmit')
        //dispatch(actions.createAccident.submit(values))
    }
})(HandOverEditor)