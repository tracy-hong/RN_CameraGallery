import React, {Component} from 'react'
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class CreditCardPage extends Component {
    constructor(props) {
        super(props);
    }

    ondelete = () => {

    };

    onModifyCredit = () => {
        Actions.modifyCredit();
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="信用卡还款"
                    back={true}
                />
                <View style={styles.subCreditCardContainer}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                        <TouchableOpacity onPress={this.onModifyCredit}>
                            <Text style={styles.modifyTextStyle}>
                                修改
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.subCreditTitleBar}>
                            <Image style={styles.creditIcon}
                                   source={require('../../image/CMB.png')}>
                            </Image>
                            <Text style={styles.creditTitle}>
                                招商银行信用卡(6628)
                            </Text>
                        </View>

                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.creditDesc}>
                            额度
                        </Text>
                        <Text style={styles.creditDesc}>
                            到账日
                        </Text>
                        <Text style={styles.creditDesc}>
                            还款日
                        </Text>
                        <Text style={styles.creditDesc}>
                            状态
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.creditDesc}>
                            24000
                        </Text>
                        <Text style={styles.creditDesc}>
                            19
                        </Text>
                        <Text style={styles.creditDesc}>
                            10
                        </Text>
                        <Text style={styles.creditDesc}>
                            无计划
                        </Text>
                    </View>

                </View>
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:250,
                        }}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.nextPage}
                >
                    添加信用卡
                </Button>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    subCreditCardContainer: {
        backgroundColor:"#0073ff",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: '#114455',
        borderRadius: 5,
        margin: 5,
        marginTop:20,
        width:width-50,
        height:160
    },

    subCreditTitleBar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginTop: 50,
        marginLeft: 20,
        // backgroundColor: '#ac78d1',
    },
    creditIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    creditTitle: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        color: '#ffffff',
        alignSelf: 'center'
    },
    deleteTextStyle: {
        flex: 1,
        fontSize: 15,
        marginTop:20,
        marginRight: 60,
        color: '#ffffff',
        alignSelf: 'center'
    },
    modifyTextStyle: {
        flex: 1,
        fontSize: 15,
        marginTop:20,
        marginLeft: 60,
        color: '#ffffff',
        alignSelf: 'center'
    },
    creditDesc: {
        // backgroundColor: '#112233',
        flex:1,
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#ffffff'
    },
    deleteContainterStyle: {
        flex: 1,
        // backgroundColor: '#3344ff',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        // alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20,
    },
    deleteIconStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
});