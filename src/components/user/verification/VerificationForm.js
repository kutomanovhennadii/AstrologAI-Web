import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import SubmitButton from '../../common/SubmitButton';
import VerificationSquare from './VerificationSquare'
import Container from '../../common/Container';

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const VerificationForm = ({ onSubmit }) => {
    const validationSchema = Yup.object().shape({
        square1: Yup.string().required().length(1),
        square2: Yup.string().required().length(1),
        square3: Yup.string().required().length(1),
        square4: Yup.string().required().length(1),
    });

    const square2Ref = useRef();
    const square3Ref = useRef();
    const square4Ref = useRef();

    return (
        <Formik
            initialValues={{ square1: '', square2: '', square3: '', square4: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Здесь ваш код для сабмита
                console.log(values);
                onSubmit();
            }}
        >
            {({ handleSubmit }) => (
                <>
                    <View style={styles.rectangleParent}>
                        <Field name="square1" component={VerificationSquare} nextInput={square2Ref} />
                        <Field name="square2" component={VerificationSquare} nextInput={square3Ref} innerRef={square2Ref} />
                        <Field name="square3" component={VerificationSquare} nextInput={square4Ref} innerRef={square3Ref} />
                        <Field name="square4" component={VerificationSquare} nextInput={square4Ref} innerRef={square4Ref} />
                    </View>
                    <Container topOffset={designConstants.topOffset40}>
                        <View >
                            <Text style={[inputStyles.titleText, inputStyles.textAlignCenter]}>{`If you don’t receive a code?`}</Text>
                            <Text style={[inputStyles.titleText, styles.ressend]}>RESEND</Text>
                        </View>

                    </Container>
                    <Container topOffset={designConstants.topOffset40}>
                        <SubmitButton text="Continue" onSubmit={handleSubmit} />
                    </Container>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    rectangleParent: {
        flexDirection: 'row',
        justifyContent: 'center',  // Выравнивает дочерние элементы по центру
        alignItems: 'center',
        paddingTop: designConstants.topOffset40
    },
    ressend: {
        color: colors.blueBell,
        textAlign: "center"
    },
});

export default VerificationForm;