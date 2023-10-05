import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const SocialLoginButton = ({ imageSource, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.continueSpaceBlock}>
        <Image style={styles.logoIconLayout} resizeMode="cover" source={imageSource} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    logoIconLayout: {
        height: 36,
        width: 36,
    },
    continueSpaceBlock: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        marginHorizontal: 15,
    },
});

export default SocialLoginButton;