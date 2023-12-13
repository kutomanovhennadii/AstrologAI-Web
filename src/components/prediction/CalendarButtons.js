import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

const CalendarButtons = ({ buttons, selected, onSelectionChange }) => {
    const handleButtonPress = (newSelection) => {
        onSelectionChange(newSelection);
    };

    //console.log("CalendarButtons selected = ", selected);

    return (
        <View style={styles.container}>
            {buttons.map((button) => (
                <TouchableOpacity
                    key={button.label}
                    style={[styles.button]}
                    onPress={() => handleButtonPress(button.label)}
                >
                    <MaterialCommunityIcons
                        name={button.iconName}
                        size={25}
                        color={selected === button.label ? colors.blueBell : colors.borderBlue}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // border: 1,
        // borderColor: "red",
    },
    button: {
        padding: 10,
        width: '33.3%',
        height: 50,
        alignItems: 'center',
        // border: 1,
        // borderColor: "red",
    }
});

export default CalendarButtons;