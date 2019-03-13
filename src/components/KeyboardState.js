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
}