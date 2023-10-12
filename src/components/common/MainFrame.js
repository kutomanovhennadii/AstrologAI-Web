import React from 'react';
import { View, StyleSheet } from 'react-native';
import AstrologAIText from './AstrologAIText'; 

const MainFrame = ({ children }) => {
    return (
        <View style={styles.container}>
            <View style={styles.scaled}>
                <AstrologAIText />
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scaled: {
        paddingTop: 30,
        marginBottom: -20,
        transform: [{ scale: 0.5 }],
    },
});

export default MainFrame;