import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Keyboard, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';

import PromptWithActionLink from './PromptWithActionLink';

const CheckboxLabelLink = React.forwardRef((props, ref) => {
    //console.log("Props and ref in CheckboxLabelLink:", props, ref);
    const { name, label, placeholder, field, form, removeFocusFromAll, validate, onLinkPress } = props;
    const [isFocused, setFocused] = useState(false);
    //console.log("Render CheckboxLabelLink:");


    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
        isFocused: () => {
            return isFocused;
        }
    }));

    const toggleCheckbox = () => {
        form.setFieldValue(field.name, !field.value);
        form.setFieldTouched(field.name, true);

        if (!isFocused) {
            if (ref.current && name) {
                ref.current.myUniqueId = name;
            }
            Keyboard.dismiss();
            removeFocusFromAll(ref);
            setFocused(true);
        }

        //console.log("toggleCheckbox, isFocused", isFocused);
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleCheckbox}
                name={name}
                validate={validate}
                onBlur={() => {
                    //console.log("CustomInput on blur")
                    setFocused(false);
                }}
                onFocus={() => {
                    //console.log("onFocus")
                    if (ref.current && name) {
                        ref.current.myUniqueId = name;
                    }
                    removeFocusFromAll(ref);
                    setFocused(true);
                }}
                style={styles.container}
                ref={ref}
            >
                <View style={[inputStyles.border, styles.checkbox, styles.center, isFocused ? inputStyles.focused : null]}>
                    {/* <Text style={[styles.icon]}>{field.value ? '✔️' : ''}</Text> */}
                    <MaterialCommunityIcons
                        name="check-bold"
                        color={field.value ? colors.blueBell : "transparent"}
                        style={styles.icon} />
                </View>
                <View style={[styles.center, styles.paddingLeft]}>
                    <PromptWithActionLink
                        promt={label}
                        buttonText={placeholder}
                        onLinkPress={onLinkPress}
                    />
                </View>
            </TouchableOpacity >
            {form.touched[field.name] && form.errors[field.name] ? (
                <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>
            ) : null}
        </>

    );
});


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,

    },
    checkbox: {
        width: designConstants.inputHeight,
        overflow: 'visible'
    },

    icon: {
        fontSize: 60,
        margin: -20
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        //borderColor: "red"
    },
    paddingLeft: {
        paddingLeft: 10
    }
});

export default CheckboxLabelLink;