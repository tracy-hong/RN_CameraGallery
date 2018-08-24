/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TextInput,
    FlatList,
    Picker,
    Button,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import LoadingView from "../widget/LoadingView";
import HeaderView from "../widget/HeaderView";
import {Actions} from 'react-native-router-flux';
import CompleteFlatList from 'react-native-complete-flatlist';
import {BankList} from "../const/BankList";

const win = Dimensions.get('window');


export default class BankPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankList: '',
            isLoading: false,
            searchKeywords: "",
        }
    }

    componentWillMount() {
        this.setState({bankList: BankList});
    }


    onClick = (item) => {
        // this.setState({isLoading: true});
        Actions.pop({ refresh: {bankName: item.abbrCN, bankId: item.bankId}});
    };


    _renderItem = (item) => {
        // this.setState({isLoading: false});
        let name = item.abbrCN;
        return <View style={styles.itemContainer}>
        <TouchableOpacity
            style={styles.areaItem}
            onPress={() => this.onClick(item)}>
            <Text>
                {name}
            </Text>
        </TouchableOpacity>
            <Image
                source={require('../../image/line_grey.png')}
                style={styles.separatorStyle}/>

        </View>
    };

    __keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                <HeaderView
                    title="选择银行"
                />

                <View style={styles.cardContainer}>
                    {this.state.bankList?
                        <CompleteFlatList
                            style={styles.areaContainer}
                            // searchKey={['name']}
                            data={this.state.bankList}
                            keyExtractor={this.__keyExtractor}
                            highlightColor="yellow"
                            renderItem={this._renderItem}
                            renderSeparator={null}
                        />
                        :
                        <Text>
                            加载中
                        </Text>
                    }
                </View>
                {this.state.isLoading && <LoadingView/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: win.width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    payContainer: {
        width: win.width,
        height: 200,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        backgroundColor: 'yellow',
    },

    titleBarContainer: {
        width: win.width,
        height: 50,
        backgroundColor: '#1a55d1',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    title: {
        width: 100,
        height: 30,
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
    },
    receiptContainer: {
        flex: 3,
        width: win.width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
        marginLeft: 30,
    },
    receiptDescBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        // backgroundColor: '#ddd',
    },
    receiptIcon: {
        width: 20,
        height: 20,
        resizeMode: Image.resizeMode.contain
    },
    receiptDescText: {
        fontSize: 18,
        color: 'black',
    },
    orderAmountText: {
        fontSize: 18,
        color: 'red',
    },
    payDescText: {
        height: 22,
        fontSize: 18,
        color: 'black',
        alignSelf: 'flex-start',
        // backgroundColor: '#f3e',
    },
    payTypePicker: {
        flex: 1,
        width: win.width,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'blue',
        // backgroundColor: 'silver',
    },
    pickerItemStyle: {
        fontSize: 18,
        color: 'blue',
    },
    payButton: {
        flex: 1,
        width: win.width * 0.9,
        // backgroundColor: '#841584',
        justifyContent: 'center',
        borderRadius: 3,
        padding: 0,
        margin: 10,
        // alignItems: 'center',
    },
    cardContainer: {
        flex: 8,
        width: win.width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        margin: 10,
    },
    subCreditCardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: '#114455',
        borderRadius: 5,
        margin: 5,
    },
    subCreditTitleBar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15,
        marginTop: 25,
        // backgroundColor: '#ac78d1',
    },
    creditIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    loanIcon: {
        width: 22,
        height: 22,
        resizeMode: 'center',
        alignSelf: 'center',
    },
    creditTitle: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        color: '#ffffff',
        alignSelf: 'center'
    },
    creditDesc: {
        // backgroundColor: '#112233',
        height: 50,
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#ffffff'
    },
    areaItem: {
        width: win.width * 0.7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    searchBar: {
        width: win.width * 0.7,
    },
    areaContainer: {
        width: win.width * 0.9,
        height: win.height * 0.9,
    },
     separatorStyle: {
        width: win.width * 0.8, height: 1, marginTop: 2
    },
    itemContainer: {
        flex: 1, width: win.width, justifyContent: 'center', alignItems: 'center'
    }
});
