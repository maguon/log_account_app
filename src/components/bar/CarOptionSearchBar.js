import React from 'react'
import { Header, Button, Icon, Left, Body } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { Field, reduxForm, destroy } from 'redux-form'
import * as reduxActions from '../../reduxActions'
import { connect } from 'react-redux'


const TextBox = props => {
    const { input: { onChange, ...restProps } } = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholderTextColor='#000'
                style={[globalStyles.midText, styles.input]}
                onChangeText={onChange}
                {...restProps} />
            <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
        </View>
    )
}

const CarOptionSearchBar = props => {
    const { layout, previousViewName, cleanCarOptionList } = props
    return (
        <View style={[styles.container, { width: layout.initWidth }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={styleColor}
                style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={() => {
                        cleanCarOptionList()
                        Actions.popTo(previousViewName)
                    }}>
                        <Icon name="arrow-back" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field name='keyword' component={TextBox} />
                </Body>
            </Header>
        </View>
    )
}


const mapDispatchToProps = (dispatch) => ({
    cleanCarOptionList: () => {
        dispatch(reduxActions.carOptionList.cleanCarOptionList())
        dispatch(destroy('carOptionalSearchForm'))
    }
})

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'carOptionalSearchForm',
    destroyOnUnmount: false,
    onChange: (values, dispatch, props, previousValues) => {
        console.log('props', props)
        const { entrustId,receiveId } = props
        if (values.keyword && values.keyword.length >= 6) {
            dispatch(reduxActions.carOptionList.getCarOptionListWaiting())
            dispatch(reduxActions.carOptionList.getCarOptionList({ entrustId,receiveId ,...values }))
        } else {
            if (previousValues.keyword && previousValues.keyword.length >= 6) {
                dispatch(reduxActions.carOptionList.cleanCarOptionList())
            }
        }

    }
})(CarOptionSearchBar))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5
    },
    leftIcon: {
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 3
    },
    input: {
        flex: 1,
        paddingVertical: 0
    },
    inputIcon: {
        paddingHorizontal: 5,
        color: '#fff'
    }
})

