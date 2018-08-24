import React, {Component} from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Button from 'apsl-react-native-button'
import HeaderView from "../widget/HeaderView";
import {Actions} from 'react-native-router-flux';
import IDCardScan from '../native/IDCardScan';
import DataKeys from "../const/DataKeys";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class RealnameInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frontCardImage: '',
            backCardImage: '',
            holdCardImage: '',
            idCardNo:'',
            isLoading: false,
        }
    }

    onTakePicture = async () => {
        // this.setState({frontCardImage: ''});
        Actions.camera({requestFrom: DataKeys.FRONT_ID_CARD})
    };

    holdCardImage = async () => {
        Actions.camera({requestFrom: DataKeys.HOLD_ID_CARD});
    };

    takeBackImage = async () => {
        Actions.camera({requestFrom: DataKeys.BACK_ID_CARD});
    };

    nextPage = () => {
        let idCardNo = this.state.idCardNo;
        Actions.cardinfo({idCardNo: idCardNo}, {frontCardImage:this.state.frontCardImage},{backCardImage:this.props.backCardImage});
    };

    takeFrontImage = async () => {
        this.setState({isLoading: true});
        try {
            let {idCardFrontImage, idCardNo} = await IDCardScan.scanIdCard(DataKeys.FRONT_ID_CARD_CODE);
            console.log("card: " + idCardFrontImage + ';' + idCardNo);
            this.setState({
                frontCardImage: idCardFrontImage,
                idCardNo: idCardNo,
                isLoading: false,
            })

        } catch (e) {
            this.setState({isLoading: false});
        }
    };

    render() {
        const frontCardImage = this.state.frontCardImage? this.state.frontCardImage: this.props.frontCardImage;

        return (
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="实名认证"
                    back={true}
                />

                {frontCardImage ?
                <TouchableHighlight onPress={this.onTakePicture}>
                    <Image style={styles.cardImage}
                           source={{uri: frontCardImage}}/>
                </TouchableHighlight>
                :
                    <TouchableHighlight onPress={this.takeFrontImage}>
                        <Image style={styles.cardImage}
                               source={require('../../image/qian.png')}/>
                    </TouchableHighlight>
                 }

                {this.props.backCardImage ?
                    <TouchableHighlight onPress={this.takeBackImage}>
                        <Image style={styles.cardImage}
                               source={{uri: this.props.backCardImage}}/>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight onPress={this.takeBackImage}>
                        <Image style={styles.cardImage}
                               source={require('../../image/back.png')}/>
                    </TouchableHighlight>
                }

                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color:'#ffffff',
                        backgroundColor:'#0073ff',
                        borderColor:'#0073ff',
                        marginTop:25}}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, color: '#ffffff', height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.nextPage}
                >
                    <Text style={{color:'#ffffff'}}>
                        下一步
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
});