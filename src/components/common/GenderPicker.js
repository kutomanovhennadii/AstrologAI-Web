import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

const GenderPicker = forwardRef(({ onSelectGender, removeFocusFromAll, name, label }, ref) => {
    const [selectedGender, setSelectedGender] = useState(''); // Стейт для выбранного пола
    const [isFocused, setFocused] = useState(false);

    console.log("Render GenderPicker");

    useEffect(() => {
        //console.log("Ref ", ref.current);
        if (ref.current && name) {
            ref.current.myUniqueId = name;
        }
    }, [name]);

    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
    }));

    const handleFocus = () => {
        console.log("Focus GenderPicker");
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
                        onSelectGender('male');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'male' && styles.radioTextSelected]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    //activeOpacity={1}
                    style={[styles.radioButton, selectedGender === 'female' && styles.selectedButton]}
                    onPress={() => {
                        setSelectedGender('female');
                        onSelectGender('female');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'female' && styles.radioTextSelected]}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, styles.borderLeft, selectedGender === 'other' && styles.selectedButton]}
                    onPress={() => {
                        setSelectedGender('other');
                        onSelectGender('other');
                        handleFocus();
                    }}
                >
                    <Text style={[inputStyles.text, selectedGender === 'other' && styles.radioTextSelected]}>Other</Text>
                </TouchableOpacity>

                {/* Поле ввода, которое появляется при выборе "Other" */}
                {selectedGender === 'other' && (
                    <TextInput
                        placeholder="Enter your gender"
                        style={[inputStyles.text, styles.inputText]}
                        onChangeText={(text) => {
                            //setSelectedGender(text);
                            onSelectGender(text);
                        }}
                        onFocus={() => {
                            handleFocus();
                        }}
                        placeholderTextColor={colors.placeholderTextColor}
                    />
                )}
            </View>
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
        height: designConstants.inputHeight -2,
    },
    selectedButton: {
        backgroundColor: colors.blueBell,
        color: 'black',
        borderColor: colors.blueBell,
        borderWidth: 1,
        borderRadius: designConstants.borderRadius-2,
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