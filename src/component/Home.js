import React, {Component} from 'react';
import {Dimensions, Image, ToastAndroid, BackHandler, StatusBar, Alert, View, Text} from "react-native";
import {StyleSheet} from 'react-native'
import Swiper from 'react-native-swiper';
import HeaderView from "../widget/HeaderView";
import {Actions} from 'react-native-router-flux';
import RNExitApp from "react-native-exit-app";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export default class Home extends Component {
    constructor(props) {
        super(props);
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
        console.log("onBackAndroid");
        if (Actions.currentScene === '_home') {
            this.onBackExitAPP();
            return true;
        }
    };

    onBackExitAPP = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

            //最近2秒内按过back键，可以退出应用。

            RNExitApp.exitApp();
            return true;

        }

        this.lastBackPressed = Date.now();

        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

        return false;
    };

    // swip 需要外面包裹一层再设置高度，要不高度会失效，沾满整个屏幕
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="首页"
                    back={false}
                />
                <View style={{flexDirection: 'column', height:height}}>
                    <View style={{height:width * 40 / 75}}>
                        <Swiper
                        style={{height:200, width:width}}
                        height={width * 40 / 75}
                        showsButtons={false}
                        autoplay={true}
                        paginationStyle={styles.paginationStyle}
                        dotStyle={styles.dotStyle}
                        activeDotStyle={styles.activeDotStyle}>
                        <Image source={require('../../image/1.jpg')} style={styles.bannerImg} />
                        <Image source={require('../../image/2.jpg')} style={styles.bannerImg} />
                        <Image source={require('../../image/3.jpg')} style={styles.bannerImg} />
                        <Image source={require('../../image/4.jpg')} style={styles.bannerImg} />
                    </Swiper>
                    </View>
                <View style={{height:200, justifyContent:'center', alignSelf: 'center'}}>
                    <Text style={{fontSize: 20,
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: '#000000'}}>
                        敬请期待
                    </Text>
                </View>



                </View>

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

    wrpaper: {
        width: width,
        height:width * 40 / 75,

    },


    bannerImg: {
        height: width*40/75,
        width: width,
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor:'#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor:'#fff',
        borderRadius: 0,
    },
});
