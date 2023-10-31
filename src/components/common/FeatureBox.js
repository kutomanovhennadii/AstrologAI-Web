import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

const FeatureBox = ({ label, isChecked }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.box, isChecked ? styles.checked : null]}>
                {isChecked && <Text style={styles.tick}>✔</Text>}
            </View>
            <Text style={[inputStyles.text, styles.label]}>{label}</Text>
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
        color: colors.darkSeaGreen,
        fontWeight: 'bold',
    },
    label: {
        marginLeft: 16,
    },
});

