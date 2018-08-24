import React from 'react-native';

class CheckUtil {

    //判断电话号码
    static checkPhone(phone) {
        if (phone === undefined){
            return false;
        }

        let pho = /^1[34578]\d{9}$/;
        if (phone.match(pho) === null) {
            return false
        }
        return true
    }

    //字符串判空
    static isStrEmpty(str) {
        if (str === '' || str === null) {
            return true
        }
        return false
    }

    //判断输入的是否是浮点数
    static checkMoney(money) {
        if (money === undefined){
            return false;
        }
        //判断字符串如果是整数不能以0开头后面加正整数，如果是浮点数整数部分不能为两个0：如00.00，如果是整数，
        let fStr = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/;
        if (money.match(fStr) === null) {
            return false
        }
        return true

    }
}

export default CheckUtil;