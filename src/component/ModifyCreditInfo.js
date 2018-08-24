import React, {Component} from 'react'
import {Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import Toast from "../widget/Toast";
import StorageUtil from "../util/StorageUtil";
import BankInfo from "../const/BackInfo";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class ModifyCreditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money:'',
            repaymentday:'',
            billday:''
        }
    }

    modify = () => {
        if (this.state.money === '') {
            Toast.show("额度不能为空", Toast.SHORT);
            return;
        }

        if (this.state.repaymentday === '') {
            Toast.show("还款日不能为空", Toast.SHORT);
            return;
        }

        if (this.state.billday === '') {
            Toast.show("账单日不能为空", Toast.SHORT);
            return;
        }

        StorageUtil.set(BankInfo.MONEY, this.state.money);
        StorageUtil.set(BankInfo.REPAYMENT_DAY, this.state.repaymentday);
        StorageUtil.set(BankInfo.BILL_DAY, this.state.billday);
        Actions.pop({refresh: {money:this.state.money, repaymentday:this.state.repaymentday, billday: this.state.billday}});
    };

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="修改信用卡信息"
                    back={true}
                />
                <View style={styles.subCreditCardContainer}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.creditDesc}>
                            {this.props.cardNo}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            额  度
                        </Text>
                        <TextInput style={styles.textInput}
                                   placeholder="额度"
                                   placeholderTextColor="#A0A0A0"
                                   keyboardType='numeric'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(money) => this.setState({money: money})}
                        />

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            还款日
                        </Text>
                        <TextInput style={styles.textInput}
                                   placeholder="还款日"
                                   placeholderTextColor="#A0A0A0"
                                   keyboardType='numeric'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(repaymentday) => this.setState({repaymentday: repaymentday})}
                        />
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            账单日
                        </Text>
                        <TextInput style={styles.textInput}
                                   placeholder="账单日"
                                   placeholderTextColor="#A0A0A0"
                                   keyboardType='numeric'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(billday) => this.setState({billday: billday})}
                        />
                    </View>

                </View>
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:50,
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                    }}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.modify}
                >
                    <Text style={{color:'#ffffff'}}>
                        修改
                    </Text>
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

    textInput: {
        height: 40,
        width: width/2,
        //内边距
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000000'
    },

    subCreditCardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: '#114455',
        borderRadius: 5,
        margin: 5,
        marginTop:20,
        width:width-50,
    },

    creditDesc: {
        // backgroundColor: '#112233',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000000'
    },
    creditInfo: {
        // backgroundColor: '#112233',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000000',
        marginLeft:160
    },
});

