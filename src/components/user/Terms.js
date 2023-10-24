import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik, Form } from 'formik';

import ScrollingText from '../common/ScrollingText';
import CheckboxLabel from '../common/CheckboxLabel'
import SubmitButton from '../common/SubmitButton';
import termsOfUseJson from '../../static/json/termsOfUse.json';
import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const termsArray = termsOfUseJson.TermOfUse;
const termsText = termsArray.join('\n\n');


//const termsText = "Lorem ipsum dolor sit amet consectetur. Purus eget rhoncus egestas adipiscing parturient ut nec ut gravida. Enim urna aenean eu id quisque diam mattis morbi. Imperdiet turpis nunc porta neque at ullamcorper dignissim. Diam fermentum quam blandit enim enim sed adipiscing. Vitae eu cras faucibus viverra in eget. A consequat aliquam cursus nulla aliquam molestie mattis sit tristique. Massa etiam id in malesuada morbi. Faucibus nunc quam adipiscing tellus facilisis. Neque leo nulla quis leo. Proin sagittis adipiscing vitae feugiat neque mattis ac. Commodo a habitant pellentesque a pellentesque lacinia cum dolor tortor. Sollicitudin id lectus ut libero at. Nunc massa congue fames non. Sit lectus integer platea orci elementum habitasse. Vitae sagittis orci eros aliquam cursus. Tortor facilisis mauris ipsum ut magna. Ac vel commodo lectus elementum et sem. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor. Rutrum mauris id habitant a at tristique at cursus ut. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor."

const Terms = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const calculatedHeight = screenHeight - 300;

    const onSubmitFormik = (values) => {
        console.log(values);
        navigation.navigate('SignUp', { termsAccepted: values.myCheckbox });
    };


    console.log("Render Terms");

    return (
        <View style={[inputStyles.size100]}>
            <Text style={[inputStyles.titleText, styles.title]}>Terms of use</Text>
            <ScrollingText text={termsText} maxHeight={calculatedHeight} />
            <Formik
                initialValues={{ myCheckbox: false }}
                onSubmit={onSubmitFormik}
            >
                {({ handleSubmit }) => (
                    <View>
                        <CheckboxLabel name="myCheckbox" label="I agree" />
                        <SubmitButton
                            text="Continue"
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