import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';

const win = Dimensions.get('window');

export default class UserPageItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TouchableOpacity activeOpacity={0.3} style={styles.root}
                              onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View
                        style={styles.itemBar}>
                        <View style={styles.descStyle}>
                            <Image
                                source={this.props.icon}
                                style={styles.icon}/>
                            <Text style={styles.text}>
                                {this.props.text}
                            </Text>
                        </View>
                        <Image
                            source={require('../../image/iv_right_arrow.png')}
                            style={styles.arrow}/>
                    </View>
                    <Image
                        source={require('../../image/line_grey.png')}
                        style={styles.separatorStyle}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: win.width * 0.8,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        height: 35,
    },
    itemBar: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: win.width * 0.7,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
    },
    descStyle: {
        // backgroundColor: 'gold',
        flexDirection: 'row', alignItems: 'center'
    },
    icon: {
        width: 15, height: 15, resizeMode: 'stretch'
    },
    text: {
        color: '#007bff', marginLeft: 10
    },
    arrow: {
        // backgroundColor: 'red',
        width: 10, height: 12, marginRight: 3
    },
    separatorStyle: {
        width: win.width * 0.8, height: 1, marginTop: 2
    }

});