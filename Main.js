import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Home from './src/component/Home.js';

const MainScreen = createBottomTabNavigator({
        Gathering: {
            screen: Home
        },
    }
);

export default MainScreen