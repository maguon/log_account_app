import React from 'react'
import { InteractionManager } from 'react-native'
import { Container, Content } from 'native-base'
import { TextBox, Select, DatePicker } from '../components/form'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import * as reduxActions from '../reduxActions'
import * as routerDirection from '../utils/RouterDirection'
import { Actions } from 'react-native-router-flux'
import { stringLength } from '../utils/validators'


const stringLengthValidator = stringLength('请输入至少6位', 6)

const HandOverForHomeSearch = props => {
    const { getCityOptionList, getCityOptionListWaiting, getDriverOptionList, getDriverOptionListWaiting,
        getEntrustOptionList, getEntrustOptionListWaiting, getReceiveOptionList, getReceiveOptionListWaiting,
        parent, sceneKey, cleanSelected, formValues } = props
    return (
        <Container>
            <Content >
                <Field name='number' label='交接单编号' validate={[stringLengthValidator]} component={TextBox} />
                <Field name='entrust' label='委托方' component={Select}
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
                <Field name='routeEnd' label='目的城市' component={Select}
                    onPress={({ onChange }) => {
                        getCityOptionListWaiting()
                        routerDirection.cityOptionList(parent, sceneKey)({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                onChange({ id, value: city_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            cleanSelected: () => cleanSelected('routeEnd'),
                            selectedItem: formValues && formValues.routeEnd ? formValues.routeEnd.item : null
                        })
                        InteractionManager.runAfterInteractions(getCityOptionList)
                    }}
                />
                <Field name='receive' label='经销商' component={Select}
                    onPress={({ onChange }) => {
                        getReceiveOptionListWaiting()
                        routerDirection.receiveOptionList(parent, sceneKey)({
                            onSelect: (param) => {
                                const { id, short_name } = param
                                onChange({ id, value: short_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            cleanSelected: () => cleanSelected('receive'),
                            selectedItem: formValues && formValues.receive ? formValues.receive.item : null
                        })
                        InteractionManager.runAfterInteractions(getReceiveOptionList)
                    }}
                />
                <Field name='receivedDateStart' label='交接单收到日期（始）' component={DatePicker} />
                <Field name='receivedDateEnd' label='交接单收到日期（终）' component={DatePicker} />
                {/* <Field name='driver' label='司机' component={Select}
                    onPress={({ onChange }) => {
                        getDriverOptionListWaiting()
                        routerDirection.driverOptionList(parent, sceneKey)({
                            onSelect: (param) => {
                                const { id, drive_name } = param
                                onChange({ id, value: drive_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            cleanSelected: () => cleanSelected('driver'),
                            selectedItem: formValues && formValues.driver ? formValues.driver.item : null
                        })
                        InteractionManager.runAfterInteractions(getDriverOptionList)
                    }}
                /> */}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { handOverListRecuer: { data: { search } } } = state
    return {
        initialValues: search,
        formValues: getFormValues('handOverListSearchForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityOptionList: () => {
        dispatch(reduxActions.cityOptionList.getCityOptionList())
    },
    getCityOptionListWaiting: () => {
        dispatch(reduxActions.cityOptionList.getCityOptionListWaiting())
    },
    getDriverOptionList: () => {
        dispatch(reduxActions.driverOptionList.getDriverOptionList())
    },
    getDriverOptionListWaiting: () => {
        dispatch(reduxActions.driverOptionList.getDriverOptionListWaiting())
    },
    getEntrustOptionList: () => {
        dispatch(reduxActions.entrustOptionList.getEntrustOptionList())
    },
    getEntrustOptionListWaiting: () => {
        dispatch(reduxActions.entrustOptionList.getEntrustOptionListWaiting())
    },
    getReceiveOptionList: () => {
        dispatch(reduxActions.receiveOptionList.getReceiveOptionList())
    },
    getReceiveOptionListWaiting: () => {
        dispatch(reduxActions.receiveOptionList.getReceiveOptionListWaiting())
    },
    cleanSelected: (fieldName) => {
        dispatch(change('handOverListSearchForm', fieldName, null))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'handOverListSearchForm',
    onSubmit: (values, dispatch) => {
        dispatch(reduxActions.handOverList.getHandOverListWaiting())
        Actions.popTo('handOverList')
        InteractionManager.runAfterInteractions(() => dispatch(reduxActions.handOverList.getHandOverList(values)))
    }
})(HandOverForHomeSearch))