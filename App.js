import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import {ActionConst, Router, Scene, Tabs} from 'react-native-router-flux';


import Home from './src/component/Home';
import RealnameInfo from "./src/component/RealnameInfo";
import Splash from "./src/component/Splash";
import TabIcon from "./src/widget/TabIcon";
import CameraPage from "./src/component/CameraPage";
import IdCardInfo from "./src/component/IdCardInfo";
import CreditCardPage from "./src/component/CreditCardPage";
import ModifyCreditInfo from "./src/component/ModifyCreditInfo";
import UserPage from "./src/component/UserPage";

class App extends Component {
    render() {
        return (
            <Router>
                <Scene key="main">
                    <Scene key="camera" component={CameraPage} hideNavBar={true}/>
                    <Scene key="cardinfo" component={IdCardInfo} hideNavBar={true}/>
                    <Scene key="creditcard" component={CreditCardPage} hideNavBar={true}/>
                    <Scene key="modifyCredit" component={ModifyCreditInfo} hideNavBar={true}/>
                    <Scene key="realname" component={RealnameInfo} hideNavBar={true}/>
                    <Scene key="splash" component={Splash} hideNavBar={true}
                           initial={true}
                    />

                    <Tabs key="tabbar" swipeEnabled tabBarPosition="bottom" showLabel={false}
                          tabBarStyle={styles.tabBarStyle}
                    >
                        <Scene key="home" component={Home} hideNavBar={true} title="首页"
                               icon={TabIcon}
                               iconDefaultImage={require('./image/iv_receipt_default.png')}
                               iconSelectImage={require('./image/iv_receipt_select.png')}
                               type={ActionConst.RESET}
                               panHandlers={null}
                        />
                        <Scene key="user" component={UserPage} hideNavBar={true} title="用户"
                               iconDefaultImage={require('./image/iv_user_default.png')}
                               iconSelectImage={require('./image/iv_user_select.png')}
                               icon={TabIcon}
                        />

                    </Tabs>
                </Scene>
            </Router>
        );
    }
}


export default App;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabStyle: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
})

