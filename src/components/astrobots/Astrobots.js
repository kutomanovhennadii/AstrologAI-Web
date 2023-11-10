import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';


import AstrobotPage from "./AstrobotPage"

import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';

const imageContext = require.context('../../static/image', true);
import useBackHandler from '../../hooks/useBackHandler';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

import { sendToServer } from '../../services/sendToServer'

export const AstrobotScreenWrapper = ({ navigation }) => {
    const onSubmit = () => {
        //console.log("AstrobotScreenWrapper onSubmit")
        navigation.navigate('Subscription');
    }

    const onBack = () => {
        //console.log("AstrobotScreenWrapper onBack")
        navigation.navigate('Profile');
    }

    return <Astrobots onSubmit={onSubmit} onBack={onBack} />;
};


const Astrobots = ({ onSubmit, onBack }) => {
    const [astrobotImages, setAstrobotImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { user, setUser } = useUser();

    // Загрузка изображений 
    const astrobots = appConfig[user.language].Astrobots;

    //console.log("Astrobots =", astrobots);

    useEffect(() => {
        const loadedImages = astrobots.reduce((acc, astrobot) => {
            acc[astrobot.name] = imageContext('./' + astrobot.image);
            return acc;
        }, {});
        setAstrobotImages(loadedImages);
        //console.log("loadedImages =", loadedImages);
    }, []);

    // Верстка страницы
    const renderItem = ({ item }) => {
        //console.log('onSubmit in renderItem:', onSubmit);
        return (
            <AstrobotPage
                image={astrobotImages[item.name]}
                name={item.name}
                title ={item.title}
                description={item.description}
                onSubmit={onSelectAstrobot}
            />
        );
    };

    const onSelectAstrobot = async (astrobotData) => {
        //console.log("Astrobot ", astrobotData, " selected");
        setUser(prevUser => ({
            ...prevUser,
            astrobot: astrobotData
        }));

        sendToServer('astrobot', astrobotData)
            .then(response => {
                console.log("Response from server", response);
            })
            .catch(error => {
                console.error("Error sending astrobot to server: ", error)
            });

        onSubmit();

    }

    useBackHandler(onBack);

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
                    data={astrobots}
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
                {astrobots.map((_, i) => {
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
        bottom: -20,
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

export default Astrobots;