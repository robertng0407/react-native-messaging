import {
    StatusBar,
    View,
    StyleSheet,
    Platform,
    NetInfo,
    Text
} from 'react-native';
import { Constants } from 'expo';
import React, { Component } from 'react';

export default class Status extends Component {
    state = {
        isConnected: null
    }

    async componentWillMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleChange
        );

        const isConnected = await NetInfo.isConnected.fetch();

        this.setState({ isConnected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.handleChange
        );
    }

    handleChange = isConnected => {
        this.setState({ isConnected });

        StatusBar.setBarStyle(
            isConnected ? 'dark-content' : 'light-content'
        );
        
        Platform.OS === 'android' && (
            StatusBar.setBackgroundColor(
                isConnected ? 'white' : 'red'
            )
        );
    }

    render() {
        const { isConnected } = this.state;
        const backgroundColor = isConnected ? 'white' : 'red';

        const messageContainer = (
            <View
                style={styles.messageContainer}
                pointerEvents={'none'}
            >
                {!isConnected && (
                    <View style={styles.bubble}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                )}
            </View>
        );

        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.status, { backgroundColor }]}>
                    {messageContainer}
                </View>
            );
        };

        return messageContainer;
    }
}

const statusHeight = (
    Platform.OS === 'ios' ? Constants.statusBarHeight : 0
);

const styles = StyleSheet.create({
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center'
    },
    status: {
        zIndex: 1,
        height: statusHeight
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red'
    },
    text: {
        color: 'white'
    }
});