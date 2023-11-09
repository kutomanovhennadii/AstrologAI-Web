import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useField } from 'formik';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';

const CheckboxLabel = ({ name, label }) => {
    const [field, , helpers] = useField(name);

    const toggleCheckbox = () => {
        helpers.setValue(!field.value);
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
            <View style={[inputStyles.border, styles.checkbox]}>
                {/* <Text style={styles.icon}>{field.value ? '✔️' : ''}</Text> */}
                <MaterialCommunityIcons
                    name="check-bold"
                    color={field.value ? colors.blueBell : "transparent"}
                    style={styles.icon} />
            </View>
            <Text style={[inputStyles.text, inputStyles.left20]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    checkbox: {
        width: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 60,
        margin: -20
    },
});

export default CheckboxLabel;