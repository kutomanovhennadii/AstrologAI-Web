import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AstrobotPage from "./AstrobotPage"
import MainFrame from '../../common/MainFrame';

import appConfig from '../../../static/json/appConfig.json';
import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const imageContext = require.context('../../../static/image', true);

const Astrobots = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    // Загрузка изображений 
    const astrobots = appConfig.Astrobots;
    useEffect(() => {
        const loadedImages = astrobots.reduce((acc, astrobot) => {
            acc[astrobot.name] = imageContext('./' + astrobot.image);
            return acc;
        }, {});
        setImages(loadedImages);
    }, []);

    // Верстка страницы
    const renderItem = ({ item }) => {
        return (
            <AstrobotPage
                image={images[item.name]}
                name={item.name}
                description={item.description}
            />
        );
    };

    // Обновление номера страницы
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0];
            setCurrentPage(firstVisibleItem.index);
        }
    }, []);


    return (
        <>
            {/* Страницы с ботами */}
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={appConfig.Astrobots}
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

            {/* Пагинация */}
            <View style={styles.paginationDots}>
                {appConfig.Astrobots.map((_, i) => {
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

        </>
    );
};

const styles = StyleSheet.create({
    paginationDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0, 
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

export default Astrobots;