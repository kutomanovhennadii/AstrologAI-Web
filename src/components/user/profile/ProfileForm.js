import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

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

    const biographyRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const dateInputRef = React.useRef(null);
    const timeInputRef = React.useRef(null);
    const countryInputRef = React.useRef(null);
    const cityInputRef = React.useRef(null);
    const genderInputRef = React.useRef(null);    

    const removeFocusFromAll = (exceptRef) => {
        console.log("exceptRef = ", exceptRef.current.blur);

        if ("Biography" !== exceptRef.current.myUniqueId) {
            console.log("Removing focus Biography input");
            biographyRef.current.blur();
        }
        if ("birthDate" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus from date input");
            dateInputRef.current.removeFocus();
        }
        if ("birthTime" !== exceptRef.current.myUniqueId) {
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

        console.log('removeFocusFromAll called');
    };

    const countries = getCountries();
    const countryList = countries.map((country) => {
        return { label: country, value: country };
    });
    const [cityList, setCityList] = React.useState([]);
    const onSelectCountry = (country) => {
        console.log("Selected ", country);
        const newCityList = getCitiesByCountry(country).map((city) => {
            return { label: city, value: city };
            
        });
        setCityList(newCityList);
        if (cityInputRef.current) {
            cityInputRef.current.removeValue();
        }
        //setFieldValue("cityPicker", '');
    }

    const onSelectCity = (city) => {
        console.log("Selected ", city);
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required field'),
        password: Yup.string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Required field'),
    });

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    birthDate: date,
                    birtTime: "",
                    country: "",
                    city: "",
                    email: '',
                    password: '',
                    gender: '', 
                    biography: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { isValid }) => {
                    console.log("onSubmit");
                    console.log(values);

                }}
            >
                {({ handleSubmit }) => (
                    <View>
                        <View>
                            {/* <label>Gender:</label> */}
                            <Field name="genderPicker">
                                {({ field, form }) => (
                                    <GenderPicker
                                        name="genderPicker"
                                        label="Select your gender"
                                        ref={genderInputRef}
                                        removeFocusFromAll={removeFocusFromAll}
                                        onSelectGender={(gender) => {
                                            console.log("Selected gender:", gender); // Вывод значения гендера в консоль
                                            //onSelectGender(gender);
                                        }}
                                    />
                                )}
                            </Field>
                        </View>

                        <View style={styles.twoWrapper}>
                            <Field name="birthDate">
                                {({ field, form }) => (
                                    <DateInput
                                        name="birthDate"
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
                                        name="birthTime"
                                        label="Time of Birth"
                                        field={field}
                                        form={form}
                                        ref={timeInputRef}
                                        removeFocusFromAll={removeFocusFromAll}
                                    />
                                )}
                            </Field>
                        </View>

                        <Field name="countryPicker">
                            {({ field, form }) => (
                                <FilteredPicker
                                    name="countryPicker"
                                    label="Select a country"
                                    ref={countryInputRef}
                                    options={countryList}
                                    //placeholder="Select country"
                                    onSelectOption={onSelectCountry}
                                    removeFocusFromAll={removeFocusFromAll}
                                    form={form} // Переименованный параметр
                                />
                            )}
                        </Field>

                        <Field name="cityPicker">
                            {({ field, form }) => (
                                <FilteredPicker
                                    name="cityPicker"
                                    label="Select a city"
                                    ref={cityInputRef}
                                    options={cityList}
                                    //placeholder="Select country"
                                    onSelectOption={onSelectCity}
                                    removeFocusFromAll={removeFocusFromAll}
                                    form={form}
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
                        {/* <CustomInput
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            ref={passwordRef}
                            removeFocusFromAll={removeFocusFromAll}
                        /> */}
                        <SubmitButton
                            text="Continue"
                            onSubmit={handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
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