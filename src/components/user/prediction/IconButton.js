import * as React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';
import designConstants from '../../../styles/designConstants';

const IconButton = ({ name, icon, onSubmit }) => {
    //console.log("IconButton name ", name, icon)
    return (

        <View style={[styles.buttonContainer, styles.padding]}>
            <TouchableOpacity
                style={[styles.buttonContainer]}
                onPress={() => onSubmit(name)}> 

                <Image
                    source={icon}
                    style={styles.imageStyle}
                />
                <Text style={inputStyles.text}>{name}</Text>
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        // borderWidth: 1,
        // borderColor: "red"
    },
    padding: {
        padding: 20,
        
    },
    imageStyle: {
        // aspectRatio: 1,
        // resizeMode: 'contain'
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }

});

export default IconButton;