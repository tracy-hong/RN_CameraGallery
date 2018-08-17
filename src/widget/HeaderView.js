import React, {Component} from 'react'
import {StyleSheet, Platform, View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';

import { Actions } from 'react-native-router-flux';
const win = Dimensions.get('window');
export default class HeaderView extends Component {
    static onBack = () => {
        Actions.pop();
    };

    render() {
        return (
            <View style={styles.titleBarContainer}>
                {this.props.back?
                    <TouchableOpacity style={styles.backIconPlaceholder} onPress={this.props.onBack}>
                        <Image style={styles.backImage}
                               source={this.props.backIcon}
                        />
                    </TouchableOpacity>
                    :
                    <View style={styles.backIconPlaceholder}/>
                }
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                {this.props.desc && this.props.menuIcon ?
                    <TouchableOpacity style={styles.menuContainer} onPress={this.props.onPress}>
                        <View style={styles.menuStyle}>
                            <Image style={styles.menuIconStyle}
                                   source={this.props.menuIcon}/>
                            <Text style={styles.text}>
                                {this.props.desc}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={styles.menuContainer}/>
                }
            </View>
        )
    }
}

HeaderView.defaultProps = {
    backIcon: require("../../image/iv_back.png"),
    onBack: HeaderView.onBack,
    back: true,
};

const styles = StyleSheet.create({
    titleBarContainer: {
        paddingTop: Platform.OS === 'ios'? 20: 0,
        flexDirection: 'row',
        width: win.width,
        height: 50,
        backgroundColor: '#0073ff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        width: win.width * 0.6,
        // flex: 7,
        height: 30,
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',
        // backgroundColor: 'grey'
    },
    menuStyle: {
        width: win.width * 0.25,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    menuIconStyle: {
        width: 15,
        height: 15,
        marginRight: 2,
        resizeMode: 'stretch'
    },
    text: {
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center',
        // backgroundColor: 'gold'
    },
    menuContainer: {
        width: win.width * 0.2,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    backImage: {
        width: 12,
        height: 16,
        resizeMode: 'stretch',
    },
    backIconPlaceholder: {
        width: win.width * 0.2,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingRight: 30,
    }
});
