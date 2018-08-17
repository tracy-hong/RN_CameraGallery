import {encrypt} from "../util/EncryptUtil";
import HttpCode from "../const/HttpCode";
import Host from "../conf/Config";
import RNFetchBlob from 'react-native-fetch-blob'
import MD5Util from "../util/MD5Util";
import {DeviceEventEmitter} from "react-native";
import CommonDataManager from "../manager/CommonDataManager";
import Toast from '../widget/Toast';

const CONTENT_TYPE = {
    multipart: 'multipart/form-data',
    urlencode: 'application/x-www-form-urlencoded;charset=UTF-8'
};

class HttpClient {
    static doPostForm(path, values, files, callback) {
        console.log("请求路径：" + path);
        console.log("请求参数：" + JSON.stringify(values));

        let body = [];
        files.forEach((photo) => {
            body.push({
                type: photo.type,
                name: photo.name,
                filename: photo.filename,
                data: RNFetchBlob.wrap(photo.uri)
            });
        });

        let args = HttpClient.plant(values);
        Object.keys(args).forEach(key => body.push({name: key, data: args[key]}));

        let url = Host.address + path;
        let header = {'Content-Type': 'multipart/form-data'};
        HttpClient.fire("POST", url, header, body, callback);
    }

    static doPost(path, data, callback) {
        HttpClient.doRequest(path, "POST", data, callback);
    }

    static doGet(path, data, callback) {
        HttpClient.doRequest(path, "GET", data, callback)
    }

    static doRequest(path, method, data, callback) {
        console.log("请求路径：" + path);
        console.log("请求参数：" + JSON.stringify(data));

        let url = Host.address + path;
        let args = HttpClient.plantUrlEncode(data);
        let body = HttpClient.feedUrlForm(method, args);
        HttpClient.fire(body.method, url, body.headers, body.body, callback);
    }

    static doGenericPost(url, data, callback) {
        console.log("请求路径：" + url);
        console.log("请求参数：" + JSON.stringify(data));

        let body = HttpClient.feedUrlForm("POST", data);
        HttpClient.fire(body.method, url, body.headers, body.body, callback);
    }

    // 只有请求服务器接口需要这样拼装，如果请求其他网址，则不需要
    static plant(data) {
        if (data === undefined || data === {}){
            return {}
        }
        let time = new Date().getTime().toString();

        let encryptData = encrypt(JSON.stringify(data));
        console.log("v: " + encryptData);
        console.log("time: " + time);
        let values = Object.assign(data, {'time': time});
        return {
            'v': encryptData,
            'time': time,
            'sign': MD5Util.generateSign(values),
            'appId': 'xmclub'
        };
    }
    static plantUrlEncode(data) {
        let time = new Date().getTime().toString();

        let encrypted = encrypt(JSON.stringify(data));
        let encryptData = encrypted.replace(/\+/g, '%2B')
        console.log("v: " + encryptData);
        console.log("time: " + time);

        let values = Object.assign(data, {'time': time});
        return {
            'v': encryptData,
            'time': time,
            'sign': MD5Util.generateSign(values),
            'appId': 'xmclub'
        };
    }
    static feedUrlForm(method, args) {
        // let body = Object.keys(args).map(key => key + '=' + args[key]).join('&') + "sign=" + sign + "&appId=xmclub";
        let body = Object.keys(args).map(key => key + '=' + args[key]).join('&');
        let header = {
            'Content-Type': CONTENT_TYPE.urlencode
        };

        console.log("body:" + body.toString());
        return HttpClient.fill(method, header, body);
    }

    static feedMultiPart(method, body) {
        // let header = {
        //         'Content-Type': CONTENT_TYPE.multipart
        //     };

        return HttpClient.fill(method, header, body);
    }

    static fill(method, header, body) {
        return {
            method: method,
            headers: header,
            body: body
        };
    }

    //
    // static fire(url, opts, callback){
    //     fetch(url, opts)
    //         .then((response) => {
    //             if (response.ok){
    //                 return response.text();
    //             } else {
    //                 let error = new Error(response.statusText);
    //                 error.response = response;
    //                 throw error
    //             }
    //         })
    //         .then((responseText) => {
    //             callback(HttpCode.SUCCESS, JSON.parse(responseText));
    //         })
    //         .catch((error) => {
    //             callback(HttpCode.ERROR, error);
    //         })
    // }

    static fire(method, url, header, body, callback) {
        RNFetchBlob
            .config({timeout:60*1000})
            .fetch(method, url, header, body).then((response) => {
            if (response.info().status === 200) {
                return response.text();
            } else if (response.info().status === 404) {
                Toast.show("404 Not Found", Toast.SHORT);
            } else if (response.info().status === 500) {
                Toast.show("服务器遇到麻烦了~", Toast.SHORT);
            } else {
                let error = new Error("response.statusText");
                error.response = response;
                throw error
            }
        })
            .then((responseText) => {
                console.log("请求结果：" + responseText);
                callback(HttpCode.SUCCESS, JSON.parse(responseText));
            })
            .catch((error) => {
                let timeoutMessage = "" + CommonDataManager.getInstance().getTimeoutMessage();
                if (timeoutMessage !== null && timeoutMessage.startsWith("timeout")){
                    callback(HttpCode.ERROR, {"data":"请求超时，请稍后重试"});
                } else {
                    console.log("异常结果：" + JSON.stringify(error));
                    callback(HttpCode.ERROR, error);
                }
            });
    }
}

export default HttpClient;