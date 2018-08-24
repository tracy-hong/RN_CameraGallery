import React, {Component} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,
    PermissionsAndroid, Platform, Alert, Modal} from 'react-native';
import {Actions, } from "react-native-router-flux";
import Toast from '../widget/Toast';
import CheckUtil from "../util/CheckUtil";
import Button from 'apsl-react-native-button'
import StorageUtil from "../util/StorageUtil";
import BackInfo from "../const/BackInfo";


const win = Dimensions.get('window');


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            loginaccout:''
        }
    }

    componentWillMount(){
        this.requestPermission();
        StorageUtil.get(BackInfo.USER_LOGIN).then((loginaccout) => {
            this.setState({loginaccout:loginaccout});
            console.log("loginaccout:" + this.state.loginaccout);
            if (this.state.loginaccout !== null) {
                this.goHome();
            }
        });
    }

    async requestPermission() {
        try {
            const permissionGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': '写入文件权限',
                    'message': '更新版本时需要此权限，否则无法执行更新'
                }
            );
            if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED
            || permissionGranted === true) {
                this.setState({granted: true});
                console.log("permission granted")
            } else {
                this.setState({granted: false});
                console.log("permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    login = () => {
        if(!CheckUtil.checkPhone(this.state.account)){
            Toast.show('请输入正确的手机号',Toast.SHORT);
            return;
        }
        if(CheckUtil.isStrEmpty(this.state.password)){
            Toast.show('请输入密码',Toast.SHORT);
            return;
        }

        if (this.state.account === "18209297209" && this.state.password === "password" ){
            StorageUtil.set(BackInfo.USER_LOGIN, this.state.account);
            this.goHome();
        } else {
            Toast.show("用户名或密码错误", Toast.SHORT);
        }

    };

    goHome = () => {
        Actions.replace('home');
    };

    render() {

        return (

            <View style={styles.container}>
                <ImageBackground
                    source={require('../../image/iv_splash.png')}
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        width:win.width,
                        height:"100%",
                        backgroundColor:'rgba(0,0,0,0)',}}>
                <View style={styles.loginBack}>
                    <ImageBackground
                        source={require('../../image/login_back.png')}
                        resizeMode='stretch'
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={require('../../image/iv_username.png')}
                                style={{width: 20, height: 20, marginLeft: 25, resizeMode: 'stretch'}}/>
                            <TextInput style={styles.textInput}
                                       placeholder="请输入手机号"
                                       keyboardType="phone-pad"
                                       maxLength={11}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(account) => this.setState({account:account})}
                            />
                        </View>
                        <View style={{width: 240, height: 1, backgroundColor: '#cccccc'}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Image
                                source={require('../../image/iv_password.png')}
                                style={{width: 22, height: 22, marginLeft: 25, resizeMode: 'stretch'}}/>
                            <TextInput style={styles.textInput}
                                       placeholder="请输入密码"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password:password})}
                            />
                        </View>
                        <View style={{width: 240, height: 1, backgroundColor: '#cccccc'}}/>
                        <Button
                            style={{ alignSelf: 'center',
                                fontSize: 18,
                                height:36,
                                width:120,
                                backgroundColor:'#0073ff',
                                borderColor:'#0073ff',
                                marginTop:30,
                            }}
                            styleDisabled={{ color: 'white' }}
                            containerStyle={{ color:"#ffffff", padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                            onPress={this.login}
                        >
                            <Text style={{color:'#ffffff'}}>
                                登录
                            </Text>
                        </Button>
                    </ImageBackground>
                </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f6f6f6',
    },
    backgroundGradient: {
        alignItems: 'center',
        width: win.width,
        height: win.height / 2,
    },
    imgStyle: {
        width: 70,
        height: 70,
        marginTop: 100,
    },
    loginBack: {
        alignSelf: 'center',
        justifyContent:'center',
        width: win.width * 0.8,
        height: 300,
    },
    textInput: {

        height: 40,
        width: 200,
        //内边距
        paddingLeft: 10,
        paddingRight: 10,
        //外边距
        marginLeft: 10,
        marginRight: 20,
        //设置相对父控件居中
    },
    btn: {
        flexDirection: 'row',
        width: 130,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: 'white',
        fontSize: 16
    },
    textForgetPsw: {
        color: '#b7b5b5',
        fontSize: 15,
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 14,
    },
    dialog: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    progress: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20

    },
});