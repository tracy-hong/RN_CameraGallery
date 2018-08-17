import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import Button from 'apsl-react-native-button'
import HeaderView from "../widget/HeaderView";
import {Actions} from 'react-native-router-flux';
import IDCardScan from '../native/IDCardScan';
import DataKeys from "../const/DataKeys";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class IdCardInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holdCardImage: '',
            idCardName: '',
            email: '',
            address: '',
            idCardNo: '',
            isLoading: false,
        }
    }


    holdCardImage = async () => {
        Actions.camera({requestFrom: DataKeys.HOLD_ID_CARD});
    };


    nextPage = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="实名认证"
                    back={true}
                />

                {this.props.holdCardImage ?
                <TouchableHighlight onPress={this.holdCardImage}>
                    <Image style={styles.cardImage}
                           source={{uri: this.props.holdCardImage}}/>
                </TouchableHighlight>
                :
                <Button
                    style={styles.idcard}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.holdCardImage}
                >
                    点击上传手持身份证照片
                </Button>
                 }

                <ImageBackground
                    source={require('../../image/input_border.png')}
                    imageStyle={styles.inputBackgroundStyle}
                    style={styles.inputContainerStyle}
                >
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="身份证号码"
                        keyboardType='numeric'
                        value={this.state.idCardNo}
                        onChangeText={(cardNo) => this.setState({
                            idCardNo: cardNo
                        })}
                    />
                </ImageBackground>
                <ImageBackground
                    source={require('../../image/input_border.png')}
                    imageStyle={styles.inputBackgroundStyle}
                    style={styles.inputContainerStyle}
                >
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="姓名"
                        value={this.state.idCardName}
                        onChangeText={(name) => this.setState({
                            idCardName: name
                        })}
                    />
                </ImageBackground>
                <ImageBackground
                    source={require('../../image/input_border.png')}
                    imageStyle={styles.inputBackgroundStyle}
                    style={styles.inputContainerStyle}
                >
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="邮箱"
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({
                            email: email
                        })}
                    />
                </ImageBackground>
                <ImageBackground
                    source={require('../../image/input_border.png')}
                    imageStyle={styles.inputBackgroundStyle}
                    style={styles.inputContainerStyle}
                >
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="地址"
                        value={this.state.address}
                        onChangeText={(address) => this.setState({
                            address: address
                        })}
                    />
                </ImageBackground>
                 
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.nextPage}
                >
                    完成
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

    idcard: {
        alignSelf: 'center',
        fontSize: 20,
        height:150,
        width:width-100,
        color: 'white',
        marginTop:40
    },

    cardImage: {
        width: width - 100,
        height: 150,
        alignSelf: 'center',
        marginTop:40,
        resizeMode: Image.resizeMode.contain,
    },

    inputContainerStyle: {
        width: width -100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    inputBackgroundStyle: {
        resizeMode: Image.resizeMode.stretch,
    },

    input: {
        width: width -100,
        height: 40,
    },
});