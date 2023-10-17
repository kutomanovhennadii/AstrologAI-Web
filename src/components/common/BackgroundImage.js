// BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { withFontsLoader } from '../../hoc/withFontsLoader'; 


const BackgroundImage = ({ children }) => {
    const image = require('../../static/image/space1.png');

    return (
        <ImageBackground source={image} style={styles.background}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default withFontsLoader(BackgroundImage);