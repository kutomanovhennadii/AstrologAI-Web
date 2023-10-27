import * as React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';
import designConstants from '../../../styles/designConstants';

const IconButton = ({ icon, onSubmit }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
            >
                {icon}
            </TouchableOpacity>
        </View>
    );
};

// const IconButton = ({ icon, onSubmit, style }) => {
//     return (
//         <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style]}>
//             <TouchableOpacity onPress={onSubmit}>
//                 <Image
//                     source={icon}
//                     style={{ width: 40, height: 40 }}
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// };

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        borderRadius: designConstants.borderRadius,
        backgroundColor: colors.backdropColorLight,
        width: '100%',
        height: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        top: 15,
    },
    text: {
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Raleway-SemiBold",
    },
});

export default IconButton;