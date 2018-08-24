import React, {Component} from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet, Text,
    View,
} from "react-native";


import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import StorageUtil from "../util/StorageUtil";
import BackInfo from "../const/BackInfo";
import Toast from "../widget/Toast";
const { width, height } = Dimensions.get('window');

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idcardnum:'',
        }
    }

    componentWillMount() {
        StorageUtil.get(BackInfo.IDCARD_NUM).then((idcardnum) => {
            this.setState({idcardnum:idcardnum});
        });

    }

    realName = () => {
        if (this.state.idcardnum !==null) {
            console.log("idcardnum: " + this.state.idcardnum);
            Toast.show("已经实名认证",Toast.SHORT);
            return;
        }
        Actions.realname();
    };

    creditInfo = () => {
        Actions.creditcard();
    };

    logout = () => {
       StorageUtil.delete(BackInfo.USER_LOGIN);
       Actions.replace('login');
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="实名认证"
                    back={false}
                />
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.realName}
                >
                    <Text style={{color:'#ffffff'}}>
                        身份认证
                    </Text>
                </Button>

                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.creditInfo}
                >
                    <Text style={{color:'#ffffff'}}>
                        信用卡信息
                    </Text>
                </Button>

                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:36,
                        width:120,
                        marginTop:150,
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                    }}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ color:"#ffffff", padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.logout}
                >
                    <Text style={{color:'#ffffff'}}>
                        退出
                    </Text>
                </Button>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },

});