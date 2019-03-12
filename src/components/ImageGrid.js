import {
    CameraRoll,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../UI/Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends Component {
    static propTypes = {
        onPressImage: PropTypes.func
    }

    static defaultProps = {
        onPressImage: () => { }
    }

    state = {
        images: [
            { uri: 'https://picsum.photos/600/600?image=10' },
            { uri: 'https://picsum.photos/600/600?image=20' },
            { uri: 'https://picsum.photos/600/600?image=30' },
            { uri: 'https://picsum.photos/600/600?image=40' }
        ]
    }

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop
        };

        return (
            <Image source={{ uri }} style={style} />
        );
    }

    render() {
        const { images } = this.state;

        return (
            <Grid
                data={images}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1
    }
});