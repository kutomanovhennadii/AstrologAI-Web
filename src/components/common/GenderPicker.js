import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

import appConfig from '../../static/json/appConfig.json';
import { useUser } from '../../context/UserContext';

const GenderPicker = forwardRef(({ onSelect, removeFocusFromAll, name, label, form, field }, ref) => {

    const [selectedGender, setSelectedGender] = useState(field.value || '');
    const [isFocused, setFocused] = useState(false);
    const { user, setUser } = useUser();

    const commonText = appConfig[user.language]["common"];

    //console.log("Render GenderPicker, field = ", field);

    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
    }));

    const handleFocus = () => {
        // console.log("Focus GenderPicker");
        if (ref.current && name) {
            ref.current.myUniqueId = name;
        }
        if (isFocused == false) {
            removeFocusFromAll(ref);
            setFocused(true);
        }
    };

    return (
        <View style={inputStyles.container}>
            <Text style={inputStyles.text}>{label}</Text>
            <View style={[inputStyles.border, styles.container, isFocused ? inputStyles.focused : null]}>

                {/* Радиокнопки для выбора пола */}
                <TouchableOpacity
                    style={[styles.radioButton, styles.borderRight, selectedGender === 'male' && styles.selectedButton]}
                    onPress={() => {
                        setSelectedGender('male');
                        onSelect('male');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'male' && styles.radioTextSelected]}>
                        {commonText["Male"]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    //activeOpacity={1}
                    style={[styles.radioButton, selectedGender === 'female' && styles.selectedButton]}
                    onPress={() => {
                        setSelectedGender('female');
                        onSelect('female');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'female' && styles.radioTextSelected]}>
                        {commonText["Female"]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, styles.borderLeft, selectedGender === 'other' && styles.selectedButton]}
                    onPress={() => {
                        setSelectedGender('other');
                        onSelect('other');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'other' && styles.radioTextSelected]}>
                        {commonText["Other"]}
                    </Text>
                </TouchableOpacity>

                {/* Поле ввода, которое появляется при выборе "Other" */}
                {selectedGender === 'other' && (
                    <TextInput
                        placeholder="Enter your gender"
                        style={[inputStyles.text, styles.inputText]}
                        onChangeText={(text) => {
                            //setSelectedGender(text);
                            onSelect(text);
                        }}
                        onFocus={() => {
                            handleFocus();
                        }}
                        placeholderTextColor={colors.placeholderTextColor}
                    />
                )}
            </View>
            {form.touched[field.name] && form.errors[field.name] ? (
                <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: -12,
    },
    radioButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        height: designConstants.inputHeight - 2,
    },
    selectedButton: {
        backgroundColor: colors.blueBell,
        color: 'black',
        borderColor: colors.blueBell,
        borderWidth: 1,
        borderRadius: designConstants.borderRadius - 2,
    },
    radioTextSelected: {
        color: 'black',
    },
    inputText: {
        paddingLeft: 10,
        width: '50%', // Устанавливаем ширину в 50%
    },
});

export default GenderPicker;