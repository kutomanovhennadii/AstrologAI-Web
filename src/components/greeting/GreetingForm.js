import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import GreetingPage from './GreetingPage';
import SubmitButton from '../common/SubmitButton';

import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';

import useBackHandler from '../../hooks/useBackHandler';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

const GreetingForm = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { user, setUser } = useUser();

    const commonText = appConfig[user.language]["common"];
    const greetingPage = appConfig[user.language]["GreetingPage"];

    const images = {
        "Welcome": require('../../static/image/midjourneycat_by_Bess_Hamiti_Starry_sky_realistic_photo.png'),
        "Daily": require('../../static/image/midjourneycat_by_Tami_Bone_Starry_sky_realistic_photo.png'),
        "Profile": require('../../static/image/midjourneycat_by_Banksy_Starry_sky_realistic_photo.png'),
        "Astrobot": require('../../static/image/midjourneycat_by_David_Carson_Starry_sky_realistic_photo.png'),
        "Content": require('../../static/image/midjourneycat_by_Neville_Brody_Starry_sky_realistic_photo.png'),
        "Push": require('../../static/image/midjourneycat_by_Scarlett_Hooft_Graafland_Starry_sky_realistic_photo.png'),
        "Premium": require('../../static/image/midjourneycat_by_Peter_Saville_Starry_sky_realistic_photo.png'),
        // ...
    };

    //console.log("images =", images);

    const renderItem = ({ item }) => {
        //console.log("Rendering item with header text: " + item.headerText);
        return (
            <GreetingPage
                //imageSource={require('../../static/image/midjourneycat_by_Bess_Hamiti_Starry_sky_realistic_photo.png')}
                imageSource={images[item.name]}
                headerText={item.headerText}
                bodyText={item.bodyText}
            />
        );
    };

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0];
            setCurrentPage(firstVisibleItem.index);
        }
    }, []);

    const onSubmit = () => {

        //console.log("Навигация на следующую страницу");
        navigation.navigate('Profile');
    };

    const onBack = () => {

        //console.log("Навигация на следующую страницу");
        navigation.navigate('Verification');
    };

    useBackHandler(onBack);

    //console.log("Render GreetingForm, currentPage = " + currentPage);
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={greetingPage}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => 'page_' + index}
                    onViewableItemsChanged={onViewableItemsChanged}
                    onScrollEndDrag={(e) => {
                        const offsetX = e.nativeEvent.contentOffset.x;
                        const width = e.nativeEvent.layoutMeasurement.width;
                        const newPage = Math.round(offsetX / width);

                        setCurrentPage(newPage);
                    }}
                />
            </View>

            <View style={styles.paginationDots}>
                {greetingPage.map((_, i) => {
                    //console.log(`Rendering dot with index: ${i}, current page: ${currentPage}`);
                    return (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === currentPage ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    );
                })}
            </View>

            <View style={styles.submitFrame}>
                <SubmitButton text={commonText["SKIP"]} onSubmit={onSubmit} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    submitFrame: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
    },
    container: {
        flex: 1,
    },
    paginationDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
    },
    dot: {
        width: 10,
        height: 10,
        margin: 20,
        borderRadius: 5,
        bottom: 20
    },
    activeDot: { backgroundColor: colors.textColor },
    inactiveDot: { backgroundColor: '#888' },
});

export default GreetingForm;