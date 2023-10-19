import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Keyboard } from 'react-native';

import DateInput from '../../common/DateInput'
import TimeInput from '../../common/TimeInput'
import CustomInput from '../../common/CustomInput';
import SubmitButton from '../../common/SubmitButton';

import FilteredPicker from '../../common/FilteredPicker';
import GenderPicker from '../../common/GenderPicker';
import MultilineInput from '../../common/MultilineInput';

import { getCountries, getCitiesByCountry } from '../../../util/countryCityUtils';

const ProfileForm = ({ onSubmit }) => {
    const [date, setDate] = React.useState(new Date());
    const [screenOffset, setScreenOffset] = useState(0);

    const biographyRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const dateInputRef = React.useRef(null);
    const timeInputRef = React.useRef(null);
    const countryInputRef = React.useRef(null);
    const cityInputRef = React.useRef(null);
    const genderInputRef = React.useRef(null);

    const removeFocusFromAll = (exceptRef) => {
        //console.log("exceptRef = ", exceptRef.current.myUniqueId);

        if ("Biography" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus Biography input");
            biographyRef.current.blur();
        }
        if ("birthDatePicker" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from date input");
            dateInputRef.current.removeFocus();
        }
        if ("birthTimePicker" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from time input");
            timeInputRef.current.removeFocus();
        }
        if ("countryPicker" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from country input");
            countryInputRef.current.removeFocus();
        }
        if ("cityPicker" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from country input");
            cityInputRef.current.removeFocus();
        }
        if ("genderPicker" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from country input");
            genderInputRef.current.removeFocus();
        }

        if (exceptRef.current.myUniqueId === 'Biography') {
            //console.log("setScreenOffset Biography");
            setScreenOffset(-170);
        } else if (exceptRef.current.myUniqueId === 'cityPicker') {
            //console.log("setScreenOffset cityPicker");
            setScreenOffset(-190);
        }
        else if (exceptRef.current.myUniqueId === 'countryPicker') {
            //console.log("setScreenOffset countryPicker");
            setScreenOffset(-65);
        }
        else {
            // Сбрасываем смещение
            setScreenOffset(0);
        }

        //console.log('removeFocusFromAll called');
    };

    const countries = getCountries();
    const countryList = countries.map((country) => {
        return { label: country, value: country };
    });
    const [cityList, setCityList] = React.useState([]);
    const onSelectCountry = (country) => {
        //console.log("Selected ", country);
        const newCityList = getCitiesByCountry(country).map((city) => {
            return { label: city, value: city };

        });
        setCityList(newCityList);
        if (cityInputRef.current) {
            cityInputRef.current.removeValue();
        }
        setScreenOffset(0);
    }

    const onSelectCity = (city) => {
        console.log("Selected ", city);
        setScreenOffset(0);
    }

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setScreenOffset(0);
                //console.log('Клавиатура закрыта');
            }
        );

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const validationSchema = Yup.object({
        gender: Yup.string()
            .required('Required field gender'),
        birthDate: Yup.date()
            .notOneOf([date], 'Date should be different from the default')
            .required('Required field'),
        birthTime: Yup.string()
            .required('Required field birtTime'),
        country: Yup.string()
            .required('Required field country'),
        city: Yup.string()
            .required('Required field city'),
        biography: Yup.string()
    });

    return (
        <View style={[styles.container, { marginTop: screenOffset }]}>
            <Formik
                initialValues={{
                    gender: '',
                    birthDate: date,
                    birthTime: "",
                    country: "",
                    city: "",
                    biography: '',
                }}
                validationSchema={validationSchema}
                validate={async (values) => {
                    //console.log("Value =", values);
                    try {
                        await validationSchema.validate(values, { abortEarly: false });
                    } catch (err) {
                        //console.log("Validation errors:", err.errors); // err.errors будет содержать массив ошибок
                    }
                }}
                onSubmit={(values, { isValid, errors }) => {
                    if (!isValid) {
                        //console.log("Errors:", errors);
                    }
                    //console.log("onSubmit");
                    console.log(values);
                }}
            >
                {({ handleSubmit }) => (
                    <View>
                        <View>
                            {/* <label>Gender:</label> */}
                            <Field name="gender">
                                {({ field, form }) => (
                                    <GenderPicker
                                        name="genderPicker"
                                        label="Select your gender"
                                        ref={genderInputRef}
                                        field={field}
                                        form={form}
                                        removeFocusFromAll={removeFocusFromAll}
                                        onSelectGender={(gender) => {
                                            //console.log("Selected gender:", gender); // Вывод значения гендера в консоль
                                            form.setFieldValue("gender", gender);
                                        }}
                                    />
                                )}
                            </Field>
                        </View>

                        <View style={styles.twoWrapper}>
                            <Field name="birthDate">
                                {({ field, form }) => (
                                    <DateInput
                                        name="birthDatePicker"
                                        label="Date of Birth"
                                        field={field}
                                        form={form}
                                        ref={dateInputRef}
                                        removeFocusFromAll={removeFocusFromAll}
                                    />
                                )}
                            </Field>

                            <Field name="birthTime">
                                {({ field, form }) => (
                                    <TimeInput
                                        name="birthTimePicker"
                                        label="Time of Birth"
                                        field={field}
                                        form={form}
                                        ref={timeInputRef}
                                        removeFocusFromAll={removeFocusFromAll}
                                    />
                                )}
                            </Field>
                        </View>

                        <Field name="country">
                            {({ field, form }) => (
                                <FilteredPicker
                                    name="country"
                                    label="Select a country"
                                    ref={countryInputRef}
                                    options={countryList}
                                    onSelectOption={onSelectCountry}
                                    removeFocusFromAll={removeFocusFromAll}
                                    form={form}
                                />
                            )}
                        </Field>

                        <Field name="city">
                            {({ field, form }) => (
                                <FilteredPicker
                                    name="city"
                                    label="Select a city"
                                    ref={cityInputRef}
                                    options={cityList}
                                    //placeholder="Select country"
                                    onSelectOption={onSelectCity}
                                    removeFocusFromAll={removeFocusFromAll}
                                    //form={form}
                                />
                            )}
                        </Field>

                        <MultilineInput
                            name="Biography"
                            label="Biography"
                            placeholder="Tell about yourself, this will make the predictions more personal"
                            ref={biographyRef}
                            removeFocusFromAll={removeFocusFromAll}
                        />

                        <SubmitButton
                            text="Continue"
                            onSubmit={() => {
                                //console.log('Button clicked');
                                handleSubmit();
                            }}
                        />
                    </View>
                )}
            </Formik>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: "red" 
    },
    twoWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ProfileForm;