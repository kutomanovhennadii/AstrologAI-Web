import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import GreetingPage from './GreetingPage';
import appConfig from '../../../static/json/appConfig.json';

const GreetingForm = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const renderItem = ({ item }) => {
        //console.log("Render renderItem, title = " + item.headerText)
        return (
            <GreetingPage
                imageSource={require('../../../static/image/midjourneycat_by_Bess_Hamiti_Starry_sky_realistic_photo.png')}
                headerText={item.headerText}
                bodyText={item.bodyText}
            />
        );
    };

    const navigateToNextPage = () => {
        console.log("Навигация на следующую страницу");
    };

    console.log("Render GreetingForm, currentPage = " + currentPage);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                horizontal
                pagingEnabled
                data={appConfig.GreetingPage}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'page_' + index}
                onScrollEndDrag={(e) => {
                    const newPage = Math.round(
                        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
                    );
                    if (newPage >= appConfig.GreetingPage.length-1) {
                        navigateToNextPage(); // ваша функция для перехода на другую страницу
                    } else {
                        setCurrentPage(newPage);
                    }
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                {appConfig.GreetingPage.map((_, i) => {
                    return (
                        <View
                            key={i}
                            style={{
                                width: 10,
                                height: 10,
                                margin: 20,
                                backgroundColor: i === currentPage ? 'white' : '#888',
                                borderRadius: 5,
                                bottom: 20,
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    size100: {
        width: "100%",
        height: "100%",
    },
});

export default GreetingForm;