import React, {Component} from 'react';
import { Image, StatusBar, StyleSheet, View} from 'react-native';

import {Actions} from 'react-native-router-flux';


export default class Splash extends Component {

    componentDidMount() {
        // 开始计时
        this.timer = setTimeout(
            () => {
                //3秒之后的操作
                Actions.replace('login');
            },
            3000
        );
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {


        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true} translucent={true}/>
                <Image source={require('../../image/iv_splash.png')} style={styles.container}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
});