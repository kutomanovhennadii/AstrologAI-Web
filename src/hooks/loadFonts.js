import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export function useFonts() {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            await Font.loadAsync({
                'Raleway-SemiBold': require('../static/fonts/raleway/Raleway-SemiBold.ttf'),
                'Raleway-Regular': require('../static/fonts/raleway/Raleway-Regular.ttf'),
                'Raleway-Black': require('../static/fonts/raleway/Raleway-Black.ttf'),
                'Raleway-Medium': require('../static/fonts/raleway/Raleway-Medium.ttf'),
                'Raleway-Heavy': require('../static/fonts/raleway.heavy.ttf'),
                'Raleway-Italic': require('../static/fonts/raleway/Raleway-Italic.ttf'),
                'Raleway-LightItalic': require('../static/fonts/raleway/Raleway-LightItalic.ttf'),
            });
            setFontLoaded(true);
        }
        load();
    }, []);

    return fontLoaded;
}