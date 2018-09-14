import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    ART,
    Dimensions
} from 'react-native'
import globalStyles from '../../style/GlobalStyles'

const { width } = Dimensions.get('window')
const mwidth = 70
const top = 46

renderMenuItem = (props, i) => {
    const { icon, title, route, changeMenuModalIsVisible } = props
    return (
        <TouchableOpacity key={i} style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                changeMenuModalIsVisible(false)
                route()
            }}>
            <View style={{ width: 18, alignItems: 'center' }} >
                {icon()}
            </View >
            <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const MenuForHeader = props => {
    const path = ART.Path()
    path.moveTo(width - 10 - mwidth * 1 / 3 + 3, top)
    path.lineTo(width - 10 - mwidth * 1 / 3 + 9, top - 7)
    path.lineTo(width - 10 - mwidth * 1 / 3 + 15, top)
    path.close()
    const { menuList, menuModalIsVisible, changeMenuModalIsVisible } = props
    const renderMenuList = menuList.map((item, i) => renderMenuItem({ ...item, changeMenuModalIsVisible }, i))
    return (
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={menuModalIsVisible}
            onRequestClose={() => changeMenuModalIsVisible(false)}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={() => changeMenuModalIsVisible(false)}>
                <View style={{ position: 'absolute', top: 0, right: 10 }}>
                    <ART.Surface width={width} height={top} >
                        <ART.Shape d={path} fill={'#fff'} />
                    </ART.Surface>
                    <View style={{
                        backgroundColor: '#fff',
                        alignSelf: 'flex-end',
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderRadius: 3
                    }}>
                        {renderMenuList}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}


export default MenuForHeader