import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import { submit } from 'redux-form'
import { connect } from 'react-redux'

const NotHandoverSearchToolButton = props => {
    const { submit } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={submit}>
                <Text style={[globalStyles.midText, { color: '#fff' }]}>搜索</Text>
            </Button>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('notHandoverSearchForm'))
    }
})

export default connect(null, mapDispatchToProps)(NotHandoverSearchToolButton)