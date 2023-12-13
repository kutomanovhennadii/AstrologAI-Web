import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const PredictionList = ({ articles, onLoadMore, astrobotImages, selectedZodiac }) => {
    const scrollRef = useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    console.log('PredictionList start');
    //console.log('PredictionList articles:', articles[0]);

    useEffect(() => {
        if (isInitialLoad && scrollRef.current) {
            scrollRef.current.scrollToOffset({ offset: 0, animated: true });
            setIsInitialLoad(false); // Установите в false после первой загрузки
        }
    }, [isInitialLoad, articles]);

    const renderItem = ({ item }) => {
        // Логирование данных элемента
        //console.log('Рендеринг элемента:', item);

        return (
            <View key={item.id} style={styles.itemContainer}>
                <View style={styles.header}>
                    <Image
                        source={astrobotImages[item.astrobot]}
                        style={styles.astrobotImage}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={[inputStyles.titleText, styles.titleText]}>
                            {selectedZodiac} {item.title}
                        </Text>
                    </View>
                </View>
                <Text style={[inputStyles.text, styles.descriptionText]}>
                    {item.content}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={scrollRef}
                data={articles}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.transparent,
        //backgroundColor: "grey",
        // borderWidth: 1,
        // borderColor: "red"
        //borderRadius: 25,

    },
    itemContainer: {
        marginHorizontal: 20,
        // borderWidth: 1,
        // borderColor: "red"
    },
    titleText: {
        paddingRight: 20,

    },
    descriptionText: {
        textAlign: 'justify',
        paddingTop: 5,
        paddingBottom: 15,
        //backgroundColor: 'rgba(191, 171, 147, 0.25)',
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
    },
    astrobotImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.blueBell
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(191, 171, 147, 0.25)',
        borderRadius: 25,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    }
});

export default PredictionList;