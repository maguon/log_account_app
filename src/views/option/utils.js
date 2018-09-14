export const highLightFilter = (list, keyword, fieldName) => {
    const filterLength = keyword.length
    return list.filter(item => item[fieldName].toLowerCase().includes(keyword.toLowerCase()))
        .map(item => {
            const targetLength = item[fieldName].length
            const postion = item[fieldName].toLowerCase().indexOf(keyword.toLowerCase())
            if (postion > 0) {
                item.highLightfield = {
                    first: {
                        str: item[fieldName].slice(0, postion),
                        isHighLight: false
                    },
                    middle: {
                        str: item[fieldName].slice(postion, postion + filterLength),
                        isHighLight: true
                    },
                    last: {
                        str: item[fieldName].slice(postion + filterLength, targetLength),
                        isHighLight: false
                    }
                }
            } else {
                item.highLightfield = {
                    first: {
                        str: item[fieldName].slice(0, filterLength),
                        isHighLight: true
                    },
                    middle: {
                        str: item[fieldName].slice(filterLength, targetLength),
                        isHighLight: false
                    },
                    last: {
                        str: '',
                        isHighLight: false
                    }
                }
            }
            return item
        })
}


export const selectedItemFilter = (list, selectedItem, fieldName) => {
    const selected = {
        ...selectedItem,
        isSelectedItem: true
    }
    noSelectedList = list.filter(item => item[fieldName] != selectedItem[fieldName])
    return [selected, ...noSelectedList]
}