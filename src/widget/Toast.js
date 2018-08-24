import {NativeModules,ToastAndroid,Platform} from 'react-native';

let ToastIOS = NativeModules.ToastIOS;

let SimpleToast = {
    // Toast duration constants
    show: function (
        message,
        duration
    ) {
        if (Platform.OS === 'android'){
            if (message === undefined || message === '') {
                ToastAndroid.show("结果异常", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(message, ToastAndroid.SHORT);
            }
    } else {
                if (message === undefined || message === '') {
                    ToastIOS.show("结果异常");
                } else {
                    ToastIOS.show(message);
                }
        }
    },

};

export default SimpleToast;
