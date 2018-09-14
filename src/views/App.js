import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import Orientation from 'react-native-orientation'
import { connect } from 'react-redux'

//<<<<<<<<<<components
import NavBar from '../components/bar/NavBar'
import OptionalSearchBar from '../components/bar/OptionalSearchBar'
import LeftButton from '../components/leftButton/LeftButton'
import TabBarIcon from '../components/bar/TabBarIcon'
import HandOverListToolButton from '../components/toolButton/HandOverListToolButton'
import HandOverListForHomeToolButton from '../components/toolButton/HandOverListForHomeToolButton'
import NotHandOverListToolButton from '../components/toolButton/NotHandOverListToolButton'
import NotHandoverSearchToolButton from '../components/toolButton/NotHandoverSearchToolButton'
import HandOverForHomeSearchToolButton from '../components/toolButton/HandOverForHomeSearchToolButton'
import HandOverSearchToolButton from '../components/toolButton/HandOverSearchToolButton'
//<<<<<<<<<<components

//<<<<<<<<<<views
import InitView from '../views/initView/InitView'
import Login from '../views/login/Login'

import Home from '../views/block/home/Home'
import Setting from '../views/block/Setting'

//<<<<<<<<<<homeBlock
import HandOverForHomeSearch from '../views/HandOverForHomeSearch'

//<<<<<<<<<<homeBlock

//<<<<<<<<<<settingBlock

//<<<<<<<<<<settingBlock

//<<<<<<<<<<handOverBlock
import HandOverList from '../views/block/handOverList/HandOverList'
import HandOverInfo from '../views/handOverInfo/HandOverInfo'
import CreateHandover from '../views/createHandover/CreateHandover'
import HandOverSearch from '../views/HandOverSearch'

//<<<<<<<<<<handOverBlock

//<<<<<<<<<<notHandoverBlock
import NotHandoverList from '../views/block/notHandoverList/NotHandoverList'
import NotHandoverDetail from '../views/notHandoverDetail/NotHandoverDetail'
import NotHandoverSearch from '../views/NotHandoverSearch'

//<<<<<<<<<<notHandoverBlock

//<<<<<<<<<<Option
import CarOptionList from '../views/option/carOptionList/CarOptionList'
import CityOptionList from '../views/option/cityOptionList/CityOptionList'
import DriverOptionList from '../views/option/driverOptionList/DriverOptionList'
import EntrustOptionList from '../views/option/entrustOptionList/EntrustOptionList'
import ReceiveOptionList from '../views/option/receiveOptionList/ReceiveOptionList'

//<<<<<<<<<<Option
//<<<<<<<<<<views

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}


export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene key="initialization" initial={true} component={InitView} hideNavBar hideTabBar />
                    <Scene
                        
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabBarIcon} online='ios-home' >
                                <Scene key="home" initial={true} component={Home} title='结算管理' hideNavBar={false} navBar={NavBar} RightButton={HandOverListForHomeToolButton} />
                                <Scene key="createHandoverAtHomeBlock" component={CreateHandover} LeftButton={LeftButton} title='添加交接单' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="handOverInfoAtHomeBlock" component={HandOverInfo} LeftButton={LeftButton} title='交接单详情' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="handOverSearchAtHomeBlock" component={HandOverForHomeSearch} LeftButton={LeftButton} RightButton={HandOverForHomeSearchToolButton} title='交接单查询' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="entrustOptionListAtHomeBlock" component={EntrustOptionList} LeftButton={LeftButton} title='委托方' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="receiveOptionListAtHomeBlock" component={ReceiveOptionList} LeftButton={LeftButton} title='经销商' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="cityOptionListAtHomeBlock" component={CityOptionList} LeftButton={LeftButton} title='城市' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                            </Scene>
                            <Scene key="handOverBlock" icon={TabBarIcon} online='ios-paper' >
                                <Scene key="handOverList" initial={true} component={HandOverList} title='交接单' hideNavBar={false} navBar={NavBar} RightButton={HandOverListToolButton} />
                                <Scene key="createHandoverAtHandOverBlock" component={CreateHandover} LeftButton={LeftButton} title='添加交接单' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="handOverInfoAtHandOverBlock" component={HandOverInfo} LeftButton={LeftButton} title='交接单详情' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="handOverSearchAtHandOverBlock" component={HandOverSearch} RightButton={HandOverSearchToolButton} LeftButton={LeftButton} title='交接单查询' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="entrustOptionListAtHandOverBlock" component={EntrustOptionList} LeftButton={LeftButton} title='委托方' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="receiveOptionListAtHandOverBlock" component={ReceiveOptionList} LeftButton={LeftButton} title='经销商' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="cityOptionListAtHandOverBlock" component={CityOptionList} LeftButton={LeftButton} title='城市' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                            </Scene>
                            <Scene key="notHandoverBlock" icon={TabBarIcon} online='ios-car' >
                                <Scene key="notHandoverList" initial={true} component={NotHandoverList} title='未交接车辆' hideNavBar={false} navBar={NavBar} RightButton={NotHandOverListToolButton} />
                                <Scene key="notHandoverDetail" component={NotHandoverDetail} LeftButton={LeftButton} title='未交接车辆详情' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="notHandoverSearch" component={NotHandoverSearch} LeftButton={LeftButton} RightButton={NotHandoverSearchToolButton} title='查询未交接车辆' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="cityOptionListAtNotHandoverBlock" component={CityOptionList} LeftButton={LeftButton} title='城市' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="driverOptionListAtNotHandoverBlock" component={DriverOptionList} LeftButton={LeftButton} title='司机' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="entrustOptionListAtNotHandoverBlock" component={EntrustOptionList} LeftButton={LeftButton} title='委托方' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                                <Scene key="receiveOptionListAtNotHandoverBlock" component={ReceiveOptionList} LeftButton={LeftButton} title='经销商' hideNavBar={false} hideTabBar={true} navBar={OptionalSearchBar} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabBarIcon} online='ios-settings' >
                                <Scene key="setting"
                                    component={Setting}
                                    initial={true}
                                    title='设置'
                                    hideNavBar={false}
                                    navBar={NavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}