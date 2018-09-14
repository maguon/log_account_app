import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
// import * as routerDirection from '../../utils/RouterDirection'

const NotHandOverListToolButton = props => {
    const { sceneKey } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.notHandoverSearch({ previousViewName: sceneKey })}>
                <Icon name='ios-search' style={{ color: '#fff' }} />
            </Button>
        </View>
    )

}
export default NotHandOverListToolButton