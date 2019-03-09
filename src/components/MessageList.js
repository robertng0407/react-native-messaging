import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';

import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = item => item.id.toString();

export default class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func
    }

    static defaultProps = {
        onPressMessage: () => {}
    }

    renderMessageItem = ({item}) => (
        
    )

    render() {
        const messages = this.props;

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
    }
});