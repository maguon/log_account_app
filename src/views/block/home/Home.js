import React, { Component } from 'react'
import { Text, InteractionManager } from 'react-native'
import { Container, Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as reduxActions from '../../../reduxActions'
import HomeStatistics from './homeStatistics/HomeStatistics'
import HandOverListForHome from './handOverListForHome/HandOverListForHome'
import { connect } from 'react-redux'


class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getHandoverStatisticsWaiting, getHandoverStatistics, getHandOverListForHomeWaiting, getHandOverListForHome } = this.props
        getHandoverStatisticsWaiting()
        getHandOverListForHomeWaiting()
        InteractionManager.runAfterInteractions(() => {
            getHandOverListForHome()
            getHandoverStatistics()
        })
    }

    render() {
        // console.log('props', props)
        const { sceneKey, parent } = this.props
        return (
            <Container>
                <HomeStatistics />
                <HandOverListForHome sceneKey={sceneKey} parent={parent} />
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    getHandoverStatisticsWaiting: () => {
        dispatch(reduxActions.homeStatistics.getHandoverStatisticsWaiting())
    },
    getHandoverStatistics: () => {
        dispatch(reduxActions.homeStatistics.getHandoverStatistics())
    },
    getHandOverListForHomeWaiting: () => {
        dispatch(reduxActions.handOverListForHome.getHandOverListForHomeWaiting())
    },
    getHandOverListForHome: () => {
        dispatch(reduxActions.handOverListForHome.getHandOverListForHome())
    }
})


export default connect(null, mapDispatchToProps)(Home)