import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, View,} from "react-native";
import HeaderView from "../widget/HeaderView";
import Toast from '../widget/Toast';
import LoadingView from "../widget/LoadingView";
import {Actions} from 'react-native-router-flux';
import {BankList, CardType} from "../const/BankList";
import _ from 'lodash';
import CheckUtil from "../util/CheckUtil";
import Button from 'apsl-react-native-button'
import BankInfo from "../const/BackInfo";
import StorageUtil from "../util/StorageUtil";

const win = Dimensions.get('window');

export default class BindCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNo: '',
            cardType: 'CREDIT',
            mobileNo: '',
            bankId: '',
            isLoading: false,
        };
    }

    bindCard = () => {
        if (this.state.cardNo === '') {
            Toast.show("卡号不能为空", Toast.SHORT);
            return;
        }

        if (!CheckUtil.checkPhone(this.state.mobileNo)) {
            Toast.show("请输入正确的手机号", Toast.SHORT);
            return;
        }
        let bankId = this.state.bankId ? this.state.bankId : this.props.bankId;
        if (bankId === '') {
            Toast.show("请选择信用卡所属银行", Toast.SHORT);
            return;
        }
        this.setState({isLoading: true});

        console.log("bankName:" + this.props.bankName + "cardNo:" + this.state.cardNo);
        let cardNum = this.state.cardNo;
        let cardNo = cardNum.toString().substring(cardNum.length - 4, cardNum.length);

        StorageUtil.set(BankInfo.BANK_NAME, this.props.bankName);
        StorageUtil.set(BankInfo.BANK_NUM, cardNum);
        StorageUtil.set(BankInfo.BANK_NUM_LAST_FORE, cardNo);

        Actions.pop({refresh: {cardNum:cardNum, cardNo:cardNo, bankName: this.props.bankName}});
    };

    onSelectBank = () => {
        if (this.state.cardNo === '' || this.state.mobileNo === ''){
            Toast.show("请先填写信用卡号和手机号");
            return;
        }
        Actions.bankpicker();
    };

    onChangeMobile = (mobileNo) => {
        if (this.state.cardNo === '') {
            Toast.show("卡号不能为空", Toast.SHORT);
            return;
        }
        
        this.setState({mobileNo: mobileNo});
    };


    render() {
        const bankNameColor = this.props.bankId ? '#000000' : '#A0A0A0';
        const bankName = this.state.bankName ? this.state.bankName : this.props.bankName;
        return (
            <View style={{flex: 1}}>
                <HeaderView title="添加信用卡"
                            onBack={this.backPress}
                />
                <View style={{backgroundColor: '#f6f6f6', padding: 20, flex: 1}}>
                    <Text style={styles.hint}>
                        为了账号安全考虑，目前仅支持绑定本人信用卡。
                    </Text>
                    <TextInput style={styles.textInput}
                               placeholder="信用卡卡号"
                               placeholderTextColor="#A0A0A0"
                               keyboardType='numeric'
                               underlineColorAndroid='transparent'
                               onChangeText={(cardNo) => this.setState({cardNo: cardNo})}
                    />
                    <View style={styles.backLine}/>

                    <TextInput style={styles.textInput}
                               placeholder="银行预留手机号"
                               placeholderTextColor="#A0A0A0"
                               keyboardType='phone-pad'
                               underlineColorAndroid='transparent'
                               onChangeText={this.onChangeMobile}
                    />
                    <View style={styles.backLine}/>


                    <TouchableOpacity onPress={this.onSelectBank}>
                        <View style={styles.bankNameContainer}>
                            <Text style={[{color: bankNameColor}, styles.bankName]}>{bankName}</Text>
                            <View style={styles.backLine}/>
                        </View>
                    </TouchableOpacity>

                    <Button
                        style={{ alignSelf: 'center',
                            fontSize: 18,
                            height:36,
                            width:120,
                            color: '#ffffff',
                            backgroundColor: '#4178FF',
                            borderColor:'#0073ff',
                            marginTop:30,
                        }}
                        styleDisabled={{ color: 'white' }}
                        containerStyle={{ color:"#ffffff", padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                        onPress={this.bindCard}
                    >
                        <Text style={{color:'#ffffff'}}>
                            完成
                        </Text>
                    </Button>
                </View>
                {this.state.isLoading && <LoadingView/>}
            </View>
        )
    }
}

BindCard.defaultProps = {
    requestCode: '',
    bankName: '请选择信用卡所属银行',
    bankId: '',
};
const styles = StyleSheet.create({
    btn: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 40,
        width: win.width - 40,
        //内边距
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000000'
    },
    backLine: {
        width: win.width - 50,
        height: 1,
        backgroundColor: '#cccccc',
        marginLeft: 5,
        marginRight: 5,
    },
    hint: {
        fontSize: 13,
        color: '#009aff',
        textAlign: 'center',
    },
    bankNameContainer: {
        height: 40,
        width: win.width - 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    bankName: {
        width: win.width - 40,
        //内边距
        paddingLeft: 10,
        margin: 10,
        // backgroundColor: 'grey',
    }

});