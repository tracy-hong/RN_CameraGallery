import React, {Component} from 'react';
import {Dimensions, Image, StatusBar, Text, View} from "react-native";
import {StyleSheet} from 'react-native'
import Swiper from 'react-native-swiper';
import HeaderView from "../widget/HeaderView";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    // swip 需要外面包裹一层再设置高度，要不高度会失效，沾满整个屏幕
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="首页"
                    back={false}
                />
                <View style={{height:width * 40 / 75}}>
                    <Swiper
                    style={{height:200, width:width}}
                    height={width * 40 / 75}
                    showsButtons={false}
                    autoplay={true}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}>
                    <Image source={require('../../image/ad_show.png')} style={styles.bannerImg} />
                    <Image source={require('../../image/ad_show.png')} style={styles.bannerImg} />
                    <Image source={require('../../image/ad_show.png')} style={styles.bannerImg} />
                    <Image source={require('../../image/ad_show.png')} style={styles.bannerImg} />
                    <Image source={require('../../image/ad_show.png')} style={styles.bannerImg} />
                </Swiper></View>

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
