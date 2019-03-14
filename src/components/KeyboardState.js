import { Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends Component {
    static propTypes = {
        layout: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }).isRequired,
        children: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        const { layout: { height } } = props;

        this.state = {
            contentHeight: height,
            keyboardHeight: 0,
            keyboardVisible: false,
            keyboardWillShow: false,
            keyboardWillHide: false,
            keyboardAnimationDuration: INITIAL_ANIMATION_DURATION
        }
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('KeyboardWillShow', this.keyboardWillShow),
                Keyboard.addListener('KeyboardWillHide', this.keyboardWillHide),
                Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
            ];
        } else {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
                Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
            ];
        };
    }

    componentWillUnmount() {
        this.subscriptions.forEach(subscription => subscription.remove());
    }

    keyboardWillShow = event => {
        this.setState({ keyboardWillShow: true });
        this.measure(event);
    }

    keyboardDidShow = event => {
        this.setState({
            keyboardWillShow: false,
            keyboardVisible: true
        });
        this.measure(event);
    }

    keyboardWillHide = event => {
        this.setState({ keyboardWillHide: true });
        this.measure(event);
    }

    keyboardDidHide = () => {
        this.setState({
            keyboardWillHide: false,
            keyboardVisible: false
        })
    }
}