import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MenuForHeader from '../share/MenuForHeader'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../utils/RouterDirection'

class HandOverListForHomeToolButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuModalIsVisible: false
        }
        this.changeMenuModalIsVisible = this.changeMenuModalIsVisible.bind(this)
    }

    changeMenuModalIsVisible(menuModalState) {
        this.setState({ menuModalIsVisible: menuModalState })
    }

    render() {
        // console.log('this.props', this.props)
        const { sceneKey, parent } = this.props
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => this.setState({ menuModalIsVisible: true })}>
                    <EntypoIcon name="dots-three-vertical" style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <MenuForHeader
                    menuList={[
                        { icon: () => <Icon name='ios-add' style={{ fontSize: 20, color: '#777' }} />, title: '增加交接单', route: routerDirection.createHandover(parent, sceneKey) },
                        { icon: () => <Icon name='ios-search' style={{ fontSize: 20, color: '#777' }} />, title: '搜索', route: routerDirection.handOverSearch(parent, sceneKey) }
                    ]}
                    menuModalIsVisible={this.state.menuModalIsVisible}
                    changeMenuModalIsVisible={this.changeMenuModalIsVisible}
                />
            </View>
        )
    }
}


export default HandOverListForHomeToolButton