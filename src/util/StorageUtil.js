import React, {AsyncStorage} from 'react-native';

class StorageUtil {

    /**
     * 获取值
     * @param key
     * @returns {Promise.<TResult>}
     */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            return JSON.parse(value)
        })
    }

    /**
     * 保存键值对
     * @param key
     * @param value
     * @returns {*|Promise}
     */
    static set(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value))
    }

    /**
     * 更新
     * @param key
     * @param value
     */
    static update(key, value) {
        return StorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value)
            return AsyncStorage.setItem(key, JSON.stringify(value))
        })
    }

    /**
     * 删除
     * @param key
     * @returns {*|Promise}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key)
    }
}

export default StorageUtil;
