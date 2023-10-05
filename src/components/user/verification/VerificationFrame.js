import React, { useRef } from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../common/SubmitButton';
import VerificationSquare from './VerificationSquare'

const VerificationFrame = () => {
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
                    <View>
                        <SubmitButton text="Continue" onSubmit={handleSubmit} />
                    </View>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    // frameLayout: {
    //     height: 60,
    //     width: 60,
    //     backgroundColor: '#d9d9d9',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // frameItem: {
    //     marginLeft: 6,
    // },
    rectangleParent: {
        flexDirection: 'row',
        justifyContent: 'center',  // Выравнивает дочерние элементы по центру
        alignItems: 'center',
        paddingTop: 30
    },
});

export default VerificationFrame;