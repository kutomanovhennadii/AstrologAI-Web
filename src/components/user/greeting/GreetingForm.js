import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import GreetingPage from './GreetingPage';
import appConfig from '../../../static/json/appConfig.json';
import SubmitButton from '../../common/SubmitButton';

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const GreetingForm = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const images = {
        "Welcome": require('../../../static/image/midjourneycat_by_Bess_Hamiti_Starry_sky_realistic_photo.png'), 
        "Daily": require('../../../static/image/midjourneycat_by_Goya_Starry_sky_realistic_photo.png'),
        "Horoscope": require('../../../static/image/midjourneycat_by_Sara_Andreasson_Starry_sky_realistic_photo.png'),
        // ...
    };

    const renderItem = ({ item }) => {
        //console.log("Rendering item with header text: " + item.headerText);
        return (
            <GreetingPage
                //imageSource={require('../../../static/image/midjourneycat_by_Bess_Hamiti_Starry_sky_realistic_photo.png')}
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

    const navigateToNextPage = () => {
        console.log("Навигация на следующую страницу");
    };

    //console.log("Render GreetingForm, currentPage = " + currentPage);
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={appConfig.GreetingPage}
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
                {appConfig.GreetingPage.map((_, i) => {
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
                <SubmitButton text="Continue" onSubmit={navigateToNextPage} />
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
        bottom: 120,   
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
    activeDot: { backgroundColor: 'white' },
    inactiveDot: { backgroundColor: '#888' },
});

export default GreetingForm;