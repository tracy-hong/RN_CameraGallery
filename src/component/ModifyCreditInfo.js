import React, {Component} from 'react'
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderView from "../widget/HeaderView";
import Button from 'apsl-react-native-button'

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class ModifyCreditInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar hidden={false} translucent={false}/>
                <HeaderView
                    title="修改信用卡信息"
                    back={true}
                />
                <View style={styles.subCreditCardContainer}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.creditDesc}>
                            卡号: 6284240800002068
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            额度
                        </Text>
                        <Text style={styles.creditInfo}>
                            24000
                        </Text>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            还款日
                        </Text>
                        <Text style={styles.creditInfo}>
                            19
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <Text style={styles.creditDesc}>
                            账单日
                        </Text>
                        <Text style={styles.creditInfo}>
                            9
                        </Text>
                    </View>

                </View>
                <Button
                    style={{ alignSelf: 'center',
                        fontSize: 18,
                        height:40,
                        width:width-80,
                        color: 'white',
                        marginTop:50,
                    }}
                    styleDisabled={{ color: 'white' }}
                    containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
                    onPress={this.nextPage}
                >
                    修改
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

    subCreditCardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: '#114455',
        borderRadius: 5,
        margin: 5,
        marginTop:20,
        width:width-50,
    },

    creditDesc: {
        // backgroundColor: '#112233',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000000'
    },
    creditInfo: {
        // backgroundColor: '#112233',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000000',
        marginLeft:160
    },
});

