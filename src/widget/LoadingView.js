import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);

// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     View,
//     Modal,
//     ActivityIndicator
// } from 'react-native';
//
// const Loader = props => {
//     const {
//         loading,
//         ...attributes
//     } = props;
//
//     return (
//         <Modal
//             transparent={true}
//             animationType={'none'}
//             visible={loading}
//             onRequestClose={() => {console.log('close modal')}}>
//             <View style={styles.modalBackground}>
//                 <View style={styles.activityIndicatorWrapper}>
//                     <ActivityIndicator
//                         animating={loading} />
//                 </View>
//             </View>
//         </Modal>
//     )
// };
//
// Loader.defaultProps = {
//     loading: true
// };
//
// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         backgroundColor: '#00000040'
//     },
//     activityIndicatorWrapper: {
//         backgroundColor: '#FFFFFF',
//         height: 100,
//         width: 100,
//         borderRadius: 10,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around'
//     }
// });
//
// export default Loader;