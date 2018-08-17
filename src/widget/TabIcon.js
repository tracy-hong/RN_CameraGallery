import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

class TabIcon extends Component {
    constructor(props){
        super(props)
        this.state = {
            iconImage: this.props.focused ? this.props.iconSelectImage: this.props.iconDefaultImage,
            textColor : this.props.focused ? '#007bff': 'black'
        }
    }

    render () {
        return (
            <View style={styles.container}>
        <Image style={styles.icon}
               source={this.state.iconImage}
        />
        <Text
            style={[{color: this.state.textColor}, styles.text]}>
        {this.props.title}
        </Text>
    </View>
        )
    }

}

export default TabIcon;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: Image.resizeMode.center,
    },
    text : {
        fontSize: 15,
        textAlign: 'center',
    }

})
