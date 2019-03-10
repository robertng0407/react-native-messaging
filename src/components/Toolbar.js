import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
);

ToolbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default class Toolbar extends Component {
    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func,
        onPressLocation: PropTypes.func
    }

    static defaultProps = {
        onChangeFocus: () => { },
        onSubmit: () => { },
        onPressCamera: () => { },
        onPressLocation: () => { }
    }

    state = {
        text: ''
    }

    handleChangeText = text => this.setState({ text });

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if (text.trim() === "") return;

        onSubmit(text);
        this.setState({ text: '' });
    }

    render() {
        const { onPressCamera, onPressLocation } = this.props;
        const { text } = this.state;

        return (
            <View style={styles.toolbar}>
                <ToolbarButton title={'📷'} onPress={onPressCamera} />
                <ToolbarButton title={'📍'} onPress={onPressLocation} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        placeholder="Type something"
                        blurOnSubmit={false}
                        value={text}
                        onChangeText={this.handleChangeText}
                        onSubmitEditing={this.handleSubmitEditing}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: 'white'
    },
    button: {
        top: -2,
        marginRight: 12,
        fontSize: 20,
        color: 'grey'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, .4)',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0, 0, 0, .2)'
    },
    input: {
        flex: 1,
        fontSize: 18
    }
});