import React, { Component } from 'react'
import { InteractionManager, Text } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { TextBox, DatePicker, Select, RichTextBox } from '../../components/form'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import * as routerDirection from '../../utils/RouterDirection'
import { Actions } from 'react-native-router-flux'
import { required, requiredObj } from '../../utils/validators'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import HandOverInfo from '../handOverInfo/HandOverInfo'

const requiredObjValidator = requiredObj('必填')
const requiredValidator = required('必填')

class CreateHandover extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.cleanHandover()
    }

    render() {
        const { getEntrustOptionListWaiting, getEntrustOptionList, isHome = false, sceneKey, cleanSelected, formValues, parent,
            handleSubmit, createHandoverReducer: { data: { settleHandoverId }, createHandover } } = this.props
        if (createHandover.isResultStatus != 2) {
            return (
                <Container>
                    <Content>
                        <Field name='serialNumber' isRequired={true} label='序号' component={TextBox} validate={[requiredValidator]} />
                        <Field name='entrust' label='委托方' isRequired={true} component={Select} validate={[requiredObjValidator]}
                            onPress={({ onChange }) => {
                                getEntrustOptionListWaiting()
                                routerDirection.entrustOptionList(parent, sceneKey)({
                                    onSelect: (param) => {
                                        const { id, short_name } = param
                                        onChange({ id, value: short_name, item: param })
                                        Actions.popTo(sceneKey)
                                    },
                                    cleanSelected: () => cleanSelected('entrust'),
                                    selectedItem: formValues && formValues.entrust ? formValues.entrust.item : null
                                })
                                InteractionManager.runAfterInteractions(getEntrustOptionList)
                            }}
                        />
                        <Field name='receivedDate' isRequired={true} label='交接单收到日期' component={DatePicker} validate={[requiredValidator]} />
                        <Field name='remark' label='备注' component={RichTextBox} />
                        <Button full style={{ margin: 15, backgroundColor: styleColor }} onPress={handleSubmit}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>创建</Text>
                        </Button>
                    </Content >
                </Container>
            )
        } else {
            return (<HandOverInfo isCreate={true} settleHandoverId={settleHandoverId} isHome={isHome} sceneKey={sceneKey} parent={parent} />)
        }
    }
}


const mapStateToProps = (state) => {
    const { handOverListRecuer: { data: { search } } } = state
    return {
        initialValues: search,
        formValues: getFormValues('createHandoverForm')(state),
        createHandoverReducer: state.createHandoverReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEntrustOptionList: () => {
        dispatch(reduxActions.entrustOptionList.getEntrustOptionList())
    },
    getEntrustOptionListWaiting: () => {
        dispatch(reduxActions.entrustOptionList.getEntrustOptionListWaiting())
    },
    cleanSelected: (fieldName) => {
        dispatch(change('createHandoverForm', fieldName, null))
    },
    cleanHandover: () => {
        dispatch(reduxActions.createHandover.cleanHandover())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createHandoverForm',
    onSubmit: (values, dispatch) => {
        dispatch(reduxActions.createHandover.createHandover({ ...values }))
    }
})(CreateHandover))