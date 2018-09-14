import { Actions } from 'react-native-router-flux'

export const handOverInfo = (parent, previousViewName) => {
    if (parent === 'homeBlock') return (param = {}) => Actions.handOverInfoAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.handOverInfoAtHandOverBlock({ ...param, previousViewName })
}

export const createHandover = (parent, previousViewName) => {
    if (parent === 'homeBlock') return (param = {}) => Actions.createHandoverAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.createHandoverAtHandOverBlock({ ...param, previousViewName })
}

export const handOverSearch = (parent, previousViewName) => {
    if (parent === 'homeBlock') return (param = {}) => Actions.handOverSearchAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.handOverSearchAtHandOverBlock({ ...param, previousViewName })
}

export const cityOptionList = (parent, previousViewName) => {
    if (parent === 'notHandoverBlock') return (param = {}) => Actions.cityOptionListAtNotHandoverBlock({ ...param, previousViewName })
    if (parent === 'homeBlock') return (param = {}) => Actions.cityOptionListAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.cityOptionListAtHandOverBlock({ ...param, previousViewName })
}

export const driverOptionList = (parent, previousViewName) => {
    if (parent === 'notHandoverBlock') return (param = {}) => Actions.driverOptionListAtNotHandoverBlock({ ...param, previousViewName })
}

export const entrustOptionList = (parent, previousViewName) => {
    if (parent === 'notHandoverBlock') return (param = {}) => Actions.entrustOptionListAtNotHandoverBlock({ ...param, previousViewName })
    if (parent === 'homeBlock') return (param = {}) => Actions.entrustOptionListAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.entrustOptionListAtHandOverBlock({ ...param, previousViewName })
}

export const receiveOptionList = (parent, previousViewName) => {
    if (parent === 'notHandoverBlock') return (param = {}) => Actions.receiveOptionListAtNotHandoverBlock({ ...param, previousViewName })
    if (parent === 'homeBlock') return (param = {}) => Actions.receiveOptionListAtHomeBlock({ ...param, previousViewName })
    if (parent === 'handOverBlock') return (param = {}) => Actions.receiveOptionListAtHandOverBlock({ ...param, previousViewName })
} 