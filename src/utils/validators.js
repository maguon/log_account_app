export const stringLength = (msg, length) => value => value && value.length < length ? msg : undefined

export const required = (msg) => (value) => (!value && value != 0 && value != '') ? msg : undefined

export const requiredObj = (msg) => (value) => (!value || Object.keys(value).length == 0 || (!value.id && value.id != 0 && value.id != '')) ? msg : undefined
