import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik, Form } from 'formik';

import ScrollingText from '../common/ScrollingText';
import CheckboxLabel from '../common/CheckboxLabel'
import SubmitButton from '../common/SubmitButton';
import termsOfUseJson from '../../static/json/termsOfUse.json';
import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';




const Terms = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const calculatedHeight = screenHeight - 300;

    const { user, setUser } = useUser();
    const commonText = appConfig[user.language]["common"];

    const onSubmitFormik = (values) => {
        console.log(values);
        navigation.navigate('SignUp', { termsAccepted: values.myCheckbox });
    };

    const termsArray = termsOfUseJson[user.language].TermOfUse;
    //const termsText = termsArray.join('\n\n');

    console.log("Render Terms");

    return (
        <View style={[inputStyles.size100]}>
            <Text style={[inputStyles.titleText, styles.title]}>
                {commonText["Terms of use"]}
            </Text>
            <ScrollingText text={termsArray} maxHeight={calculatedHeight} />
            <Formik
                initialValues={{ myCheckbox: false }}
                onSubmit={onSubmitFormik}
            >
                {({ handleSubmit }) => (
                    <View>
                        <CheckboxLabel name="myCheckbox" label={commonText["I agree"]} />
                        <SubmitButton
                            text={commonText["Continue"]}
                            onSubmit={handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>);
};


const styles = StyleSheet.create({
    title: {
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: "Raleway-Medium",
    },
})


export default Terms;