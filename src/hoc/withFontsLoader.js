import React from 'react';
import { Text } from 'react-native';
import { useFonts } from '../hooks/loadFonts';

export function withFontsLoader(WrappedComponent) {
    return (props) => {
        const fontLoaded = useFonts();

        if (!fontLoaded) {
            return <Text>Loading...</Text>;
        }

        return <WrappedComponent {...props} />;
    };
}
