import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { MapView } from 'expo';

import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = item => item.id.toString();

export default class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func
    }

    static defaultProps = {
        onPressMessage: () => { }
    }

    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;

        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    }

    renderMessageBody({ type, text, uri, coordinate }) {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );
            case 'image':
                return (
                    <Image style={styles.image} source={{ uri }} />
                );
            case 'location':
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: .08,
                            longitudeDelta: .04
                        }}
                    >
                        <MapView.Marker coordinate={coordinate} />
                    </MapView>
                );
            default: return null;
        }
    }

    render() {
        const { messages } = this.props;

        return (
            <FlatList
                style={styles.container}
                inverted
                data={messages}
                renderItem={this.renderMessageItem}
                keyExtractor={keyExtractor}
                keyboardShouldPersistTaps={'handled'}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'visible'
    },
    messageBubble: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(16, 135, 255)',
        borderRadius: 20
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 60
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 10
    },
    map: {
        height: 250,
        width: 250,
        borderRadius: 10
    }
});