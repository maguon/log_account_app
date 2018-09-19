import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import loginReducer from  './views/login/loginReducer'
import initViewReducer from  './views/initView/initViewReducer'
import personalCenterReducer from  './views/personalCenter/personalCenterReducer'
import notHandoverListRecuer from  './views/block/notHandoverList/notHandoverListRecuer'
import handOverListForHomeRecuer from  './views/block/home/handOverListForHome/handOverListForHomeRecuer'
import handOverListRecuer from './views/block/handOverList/handOverListRecuer'
import createHandoverReducer from './views/createHandover/createHandoverReducer'
import handOverCarListReducer from './views/handOverInfo/handOverCarList/handOverCarListReducer'
import handOverImageReducer from './views/handOverInfo/handOverImage/handOverImageReducer'


import homeStatisticsRecuer from  './views/block/home/homeStatistics/homeStatisticsRecuer'
import cityOptionListReducer from  './views/option/cityOptionList/cityOptionListReducer'
import driverOptionListReducer from  './views/option/driverOptionList/driverOptionListReducer'
import entrustOptionListReducer from  './views/option/entrustOptionList/entrustOptionListReducer'
import receiveOptionListReducer from  './views/option/receiveOptionList/receiveOptionListReducer'
import carOptionListReducer from  './views/option/carOptionList/carOptionListReducer'

export default combineReducers({
    form: formReducer,
    loginReducer,
    homeStatisticsRecuer,
    initViewReducer,
    handOverImageReducer,
    handOverCarListReducer,
    personalCenterReducer,
    handOverListRecuer,
    createHandoverReducer,
    handOverListForHomeRecuer,
    notHandoverListRecuer,
    cityOptionListReducer,
    driverOptionListReducer,
    entrustOptionListReducer,
    receiveOptionListReducer,
    carOptionListReducer
})