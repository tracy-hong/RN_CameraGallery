import React, {Component} from 'react'
import {
    BackHandler,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import Toast from "../widget/Toast";
import CommonDataManager from "../manager/CommonDataManager";

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

    componentDidMount() {
        console.log("componentDidMount");
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        console.log('currentScene: ' + Actions.currentScene);
        if (Actions.currentScene === 'modifyCredit') {
            Actions.replace('user');
            return true;
        }
    };

    goCreditPage = () => {
        Actions.replace('user');
    };

    modify = () => {
        if (this.state.money === '') {
            Toast.show("额度不能为空", Toast.SHORT);
            return;
        }

        if (this.state.money < 0 || !this.isRealNum(this.state.money)) {
            Toast.show("额度无效", Toast.SHORT);
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

        if (this.state.repaymentday > 31 || this.state.repaymentday < 0 || !this.isRealNum(this.state.repaymentday)) {
            Toast.show("还款日无效", Toast.SHORT);
            return
        }

        if (this.state.billday > 31 || this.state.billday < 0 || !this.isRealNum(this.state.billday)) {
            Toast.show("账单日无效", Toast.SHORT);
            return
        }

        // 更新数据库
        CommonDataManager.getInstance().initDatabase().write(()=>{
            //进行更新
            CommonDataManager.getInstance().initDatabase().create('BankInfoData',
                {id:this.props.cardNum,cardMoney:this.state.money, cardRepayDay: this.state.repaymentday,
                    cardBillDay:this.state.billday},true);
        });
        Actions.replace('user')
    };

    isRealNum = (val) =>{
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
        if(val === "" || val ==null){
            return false;
        }

        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    };

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="修改信用卡信息"
                    onBack={this.goCreditPage}
                />
                <View style={styles.subCreditCardContainer}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.creditDesc}>
                            {this.props.cardNum}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            额  度
                        </Text>
                        <TextInput style={styles.textInput}
                                   placeholder={this.props.cardMoney === '' ? "额度" : this.props.cardMoney}
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
                                   placeholder={this.props.cardRepayDay === '' ? "还款日" : this.props.cardRepayDay }
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
                                   placeholder={this.props.cardBillDay === '' ? "账单日" : this.props.cardBillDay }
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

