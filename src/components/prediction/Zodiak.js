import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import useZodiacImages from '../../hooks/useZodiacImages';


const Zodiak = ({ onZodiacSelected }) => {
    const zodiacImages = useZodiacImages();

    const handleIconButtonClick = (name) => {
        //console.log(name);
        onZodiacSelected(name);
    };

    //console.log("Render Zodiak");

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {Object.keys(zodiacImages).map((zodiacName, index) => (
                    <View key={index} style={styles.buttonContainer}>
                        <IconButton
                            name={zodiacName}
                            icon={zodiacImages[zodiacName]}
                            onSubmit={handleIconButtonClick}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        top: 30
    },
    buttonContainer: {
        width: '33.333%',
        //padding: 5,

    }
});
export default Zodiak;