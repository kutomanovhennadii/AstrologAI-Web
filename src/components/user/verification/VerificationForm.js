import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import SubmitButton from '../../common/SubmitButton';
import VerificationSquare from './VerificationSquare'
import Container from '../../common/Container';

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const VerificationForm = ({ onSubmit, initialValues, onResend }) => {
    const validationSchema = Yup.object().shape({
        square0: Yup.string().required().length(1),
        square1: Yup.string().required().length(1),
        square2: Yup.string().required().length(1),
        square3: Yup.string().required().length(1),
    });

    console.log("VerificationForm initialValues = ", initialValues);

    const square2Ref = useRef();
    const square3Ref = useRef();
    const square4Ref = useRef();

    return (
        <Formik
            key={Date.now()} 
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                // Здесь ваш код для сабмита
                console.log("VerificationForm values = ", values);
                onSubmit(values);
            }}
        >
            {({ handleSubmit }) => {
                // Добавлено логгирование перед рендерингом компонента
                console.log("Rendering VerificationForm with initialValues = ", initialValues);
                return (
                    <>
                        <View style={styles.rectangleParent}>
                            <Field name="square0" component={VerificationSquare} nextInput={square2Ref} />
                            <Field name="square1" component={VerificationSquare} nextInput={square3Ref} innerRef={square2Ref} />
                            <Field name="square2" component={VerificationSquare} nextInput={square4Ref} innerRef={square3Ref} />
                            <Field name="square3" component={VerificationSquare} innerRef={square4Ref} />
                        </View>
                        <Container topOffset={designConstants.topOffset40}>
                            <View>
                                <Text style={[inputStyles.titleText, inputStyles.textAlignCenter]}>
                                    {`If you don’t receive a code?`}
                                </Text>
                                <TouchableOpacity onPress={onResend}>
                                    <Text style={[inputStyles.titleText, styles.ressend]}>RESEND</Text>
                                </TouchableOpacity>
                            </View>
                        </Container>
                        <Container topOffset={designConstants.topOffset40}>
                            <SubmitButton text="Continue" onSubmit={handleSubmit} />
                        </Container>
                    </>
                );
            }}
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