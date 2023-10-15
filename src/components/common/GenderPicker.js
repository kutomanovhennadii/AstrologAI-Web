import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const GenderPicker = ({ onSelectGender, name, label }) => {
    const [selectedGender, setSelectedGender] = useState(''); // Стейт для выбранного пола

    console.log("Render GenderPicker");
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>

                {/* Радиокнопки для выбора пола */}
                <TouchableOpacity
                    style={[styles.radioButton, selectedGender === 'male' && styles.selected]}
                    onPress={() => {
                        setSelectedGender('male');
                        onSelectGender('male');
                    }}
                >
                    <Text style={[styles.radioText, selectedGender === 'male' && styles.radioTextSelected]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, selectedGender === 'female' && styles.selected]}
                    onPress={() => {
                        setSelectedGender('female');
                        onSelectGender('female');
                    }}
                >
                    <Text style={[styles.radioText, selectedGender === 'female' && styles.radioTextSelected]}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, selectedGender === 'other' && styles.selected]}
                    onPress={() => {
                        setSelectedGender('other');
                        onSelectGender('other');
                    }}
                >
                    <Text style={[styles.radioText, selectedGender === 'other' && styles.radioTextSelected]}>Other</Text>
                </TouchableOpacity>

                {/* Поле ввода, которое появляется при выборе "Other" */}
                {selectedGender === 'other' && (
                    <TextInput
                        placeholder="Enter your gender"
                        style={styles.input}
                        onChangeText={(text) => {
                            //setSelectedGender(text);
                            onSelectGender(text);
                        }}
                        placeholderTextColor="white"
                    />
                )}
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    radioButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    selected: {
        backgroundColor: 'white',
        color: 'black',
    },
    radioText: {
        color: 'white',
    },
    radioTextSelected: {
        color: 'black', // Черный цвет текста при выборе
    },
    input: {
        //flex: 1,
        color: 'white',
        paddingLeft: 10,
        fontSize: 16,
        width: '50%', // Устанавливаем ширину в 50%
    },
    label: {
        color: 'white',
        fontSize: 16,
    }
});

export default GenderPicker;