import React, {Component} from 'react'
import {
    BackHandler,
    Dimensions,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import StorageUtil from "../util/StorageUtil";
import BankInfo from "../const/BackInfo";
import CommonDataManager from "../manager/CommonDataManager";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class CreditCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankCardInfoList: [] ,
            cardNum:'', //卡号
            cardName:'',   // 银行名称
            cardNumLast:'',// 银行卡后四位
            cardMoney:'',  // 额度
            cardRepayDay:'',// 还款日
            cardBillDay:'', // 账单日
        };


    }

    componentWillMount() {
        this.getBankCardList();
    }

    /**
     * 从数据库中拿到BankInfo
     */
    getBankCardList = () => {
        let bankInfo = CommonDataManager.getInstance().initDatabase().objects('BankInfoData');
        let data = [];

        for (let i = 0; i <  Array.from(bankInfo).length; i++) {
            console.log("Info: " + bankInfo.length + bankInfo[i].id);
            data.push({
                            key: {
                                'cardNum': bankInfo[i].id,
                                'cardName': bankInfo[i].cardName,
                                'cardNumLast': bankInfo[i].cardNumLast,
                                'cardMoney': bankInfo[i].cardMoney,
                                'cardRepayDay': bankInfo[i].cardRepayDay,
                                'cardBillDay': bankInfo[i].cardBillDay,
                            }
                        });
        }
        this.setState({
            bankCardInfoList: data,
        })

        Actions.refresh({bankCardInfoList: data})
    };

    /**
     * 从数据库中删除数据
     * @param bankCardNum
     * @param bankCardName
     * @param bankCardLast
     * @param bankCardMoney
     * @param bankCardReplay
     * @param bankCardBilly
     */
    deleteBank = (bankCardNum, bankCardName, bankCardLast, bankCardMoney, bankCardReplay, bankCardBilly) => {
        CommonDataManager.getInstance().initDatabase().write(()=>{
            let bankinfo = CommonDataManager.getInstance().initDatabase().create('BankInfoData',{id:bankCardNum,cardName:bankCardName,cardNumLast:bankCardLast,
                cardMoney:bankCardMoney,cardRepayDay:bankCardReplay,cardBillDay:bankCardBilly}, true);


            CommonDataManager.getInstance().initDatabase().delete(bankinfo);
        });

        this.getBankCardList();
            // Actions.refresh({bankCardInfoList: data});
    };

    onModifyCredit = (bankCardNum, bankCardMoney, bankCardRepay,bankCardBill) => {
        Actions.replace('modifyCredit', {cardNum:bankCardNum, cardMoney:bankCardMoney
            , cardRepayDay:bankCardRepay, cardBillDay:bankCardBill});
    };

    bindCreditCard = () => {
       Actions.replace('bindcard');
    };

    itemBankInfo = ({item}) => {
        let cardNum = item.key.cardNum; //卡号
        let cardName = item.key.cardName;   // 银行名称
        let cardNumLast = item.key.cardNumLast;// 银行卡后四位
        let cardMoney = item.key.cardMoney;  // 额度
        let cardRepayDay = item.key.cardRepayDay;// 还款日
        let cardBillDay = item.key.cardBillDay; // 账单日

        this.setState({cardNum:cardNum});
        this.setState({cardName:cardName});
        this.setState({cardNumLast:cardNumLast});
        this.setState({cardMoney:cardMoney});
        this.setState({cardRepayDay:cardRepayDay});
        this.setState({cardBillDay:cardBillDay});
       return <View style={styles.subCreditCardContainer}
        >
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>

                <TouchableOpacity onPress={() => this.onModifyCredit(cardNum, cardMoney, cardRepayDay, cardBillDay)}>
                    <Image style={styles.modifyTextStyle}
                           source={require('../../image/ic_button_setting.png')}
                    />
                </TouchableOpacity>



                <TouchableOpacity onPress={() => this.deleteBank(cardNum, cardName, cardNumLast, cardMoney, cardRepayDay,cardBillDay)}
                   style={{marginLeft: width - 135,}}               >
                    <Image style={styles.deleteTextStyle}
                           source={require('../../image/iv_delete.png')}/>

                </TouchableOpacity>

            </View>

           <View style={styles.subCreditTitleBar}>
               <Image style={styles.creditIcon}
                      source={require('../../image/CMB.png')}>
               </Image>
               <Text style={styles.creditTitle}>
                   {cardName}({cardNumLast})
               </Text>
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
                    {cardMoney}
                </Text>
                <Text style={styles.creditDesc}>
                    {cardBillDay}
                </Text>
                <Text style={styles.creditDesc}>
                    {cardRepayDay}
                </Text>
                <Text style={styles.creditDesc}>
                    无计划
                </Text>
            </View>

        </View>
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="信用卡"
                    back={false}
                />
                {this.state.bankCardInfoList ?
                    <FlatList
                        data={this.state.bankCardInfoList}
                        renderItem={this.itemBankInfo}>
                    </FlatList>
                    :
                    <Text>
                       
                    </Text>
                }
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:20,
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                        }}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.bindCreditCard}
                >
                    <Text style={{color:'#ffffff'}}>
                        添加信用卡
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
        marginTop: 20,
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
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop:20,
        // marginLeft: width - 135,
        justifyContent: 'flex-end',
    },
    modifyTextStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop:20,
        marginLeft: 20,
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20,
    },

});