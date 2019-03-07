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

    render() {
        const { isConnected } = this.state;
        const backgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        );

        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.status, {backgroundColor}]}>
                    {statusBar}
                </View>
            );
        };

        return null;
    }
}

const statusHeight = (
    Platform.OS === 'ios' ? Constants.statusBarHeight : 0
);

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight
    }
});