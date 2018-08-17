import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from 'react-native';
import CameraKitCameraScreen from '../widget/CameraScreen/CameraKitCameraScreen';
import { CameraKitCamera } from  'react-native-camera-kit'
import ImageResizer from '../native/ImageResizer';
import { Actions } from 'react-native-router-flux';
import LoadingView from '../widget/LoadingView';
import DataKeys from '../const/DataKeys';

export default class CameraPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentWillMount(){
        this.checkPermission();
    }

    checkPermission = async () => {
         this.setState({ isLoading: true });
        const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
        if (!isCameraAuthorized){
            const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();
            if (isUserAuthorizedCamera){
                this.setState({ isLoading: false });
            }
        } else {
            this.setState({isLoading: false});
        }
    };
    onBottomButtonPressed(event) {
            this.setState({isLoading: true});
            let image = event.image;
            this.resize(image);
    }

    resize = async (image) => {
        let cardImage = await ImageResizer.resize(image.uri);
        console.log("Image width@height：" + image.width + '@' + image.height);
        console.log("Image：" + cardImage.image_path);
        this.setState({isLoading: false});
        switch (this.props.requestFrom) {
            case DataKeys.HOLD_ID_CARD:
                Actions.pop({refresh: {holdCardImage: cardImage.image_path}});
                break;
            case DataKeys.BACK_ID_CARD:
                Actions.pop({refresh: {backCardImage: cardImage.image_path}});
                break;
            case DataKeys.FRONT_ID_CARD:
                Actions.pop({refresh: {frontCardImage: cardImage.image_path}});
                break;
            case DataKeys.BACK_BANK_CARD:
                Actions.pop({refresh: {bankCardBackImage: cardImage.image_path}});
                break;
            case DataKeys.FRONT_BANK_CARD:
                Actions.pop({refresh: {bankCardFrontImage: cardImage.image_path}});
                break;
            default:
                Actions.pop();

        }
    };

    static onBack = () => {

    };


    render() {
        return (
            <View style={{flex: 1}}>
            <CameraKitCameraScreen
                // actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                flashImages={{
                    on: require('../../image/flashOn.png'),
                    off: require('../../image/flashOff.png'),
                    auto: require('../../image/flashAuto.png')
                }}
                cameraFlipImage={require('../../image/cameraFlipIcon.png')}
                captureButtonImage={require('../../image/cameraButton.png')}
            />
                {this.state.isLoading && <LoadingView/>}
            </View>
        )
    }
}

CameraPage.defaultProps = {
    requestFrom: ''
};

