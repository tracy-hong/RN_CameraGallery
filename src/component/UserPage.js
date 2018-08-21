import React, {Component} from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";


import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');

export default class UserPage extends Component {
    constructor(props) {
        super(props);
    }

    realName = () => {
        Actions.realname();
    };

    creditInfo = () => {
        Actions.creditcard();
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
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.realName}
                >
                    身份认证
                </Button>

                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.creditInfo}
                >
                    信用卡信息
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