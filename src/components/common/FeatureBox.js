import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeatureBox = ({ label, isChecked }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.box, isChecked ? styles.checked : null]}>
                {isChecked && <Text style={styles.tick}>✔</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

export default FeatureBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    box: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        //backgroundColor: 'opasity',
    },
    tick: {
        color: 'green',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '500',
        fontFamily: 'Roboto',
        color: '#fff',
        textAlign: 'left',
        marginLeft: 16,
    },
});

