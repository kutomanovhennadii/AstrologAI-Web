import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import DateInput from '../../common/DateInput'
import TimeInput from '../../common/TimeInput'
import CustomInput from '../../common/CustomInput';
import SubmitButton from '../../common/SubmitButton';
import CustomPicker from '../../common/CustomPicker';
import FilteredPicker from '../../common/FilteredPicker';

import { getCountries, getCitiesByCountry } from '../../../util/countryCityUtils';

const ProfileForm = ({ onSubmit }) => {
    const [date, setDate] = React.useState(new Date());

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const dateInputRef = React.useRef(null);
    const timeInputRef = React.useRef(null);
    const countryInputRef = React.useRef(null);
    const cityInputRef = React.useRef(null);

    const removeFocusFromAll = (exceptRef) => {
        console.log("exceptRef = ", exceptRef.current.myUniqueId);

        if ("email" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus email input");
            emailRef.current.blur();
        }
        if ("password" !== exceptRef.current.myUniqueId) {
            //console.log("Removing focus password input");
            passwordRef.current.blur();
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
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { isValid }) => {
                    console.log("onSubmit");
                    console.log(values);

                }}
            >
                {({ handleSubmit }) => (
                    <View>
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

                        <FilteredPicker
                            name="countryPicker"
                            label="Select a country"
                            ref={countryInputRef}
                            options={countryList}
                            placeholder="Select country"
                            onSelectOption={onSelectCountry}
                            removeFocusFromAll={removeFocusFromAll}
                        />

                        <FilteredPicker
                            name="cityPicker"
                            label="Select a city"
                            ref={cityInputRef}
                            options={cityList}
                            placeholder="Select country"
                            onSelectOption={onSelectCity}
                            removeFocusFromAll={removeFocusFromAll}
                            //form={form}
                        />

                        <CustomInput
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            ref={emailRef}
                            removeFocusFromAll={removeFocusFromAll}
                        />
                        <CustomInput
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            ref={passwordRef}
                            removeFocusFromAll={removeFocusFromAll}
                        />
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