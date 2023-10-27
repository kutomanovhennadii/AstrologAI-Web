import React from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet } from 'react-native';

import termsOfUseJson from '../../../static/json/termsOfUse.json';
import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

const PredictionList = ({ articles, onLoadMore, astrobotImages }) => {
    console.log("PredictionList");

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (nativeEvent.contentOffset.y >= (nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height) * 0.9) {
                        onLoadMore();
                    }
                }}
                showsVerticalScrollIndicator={true}
            >
                {articles.map((item, index) => (
                    <View key={index.toString()} style={styles.itemContainer}>
                        <View style={styles.header}>
                            <Image
                                source={astrobotImages[item.astrobot]}
                                style={styles.astrobotImage}
                            />
                            <View style={styles.titleContainer}>
                                <Text style={[inputStyles.titleText, styles.titleText]}>{item.title}</Text>
                            </View>
                        </View>
                        <Text style={[inputStyles.text, styles.descriptionText]}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>
            {/* <View style={styles.fakeScrollbar} /> */}
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
    },
    itemContainer: {
        marginHorizontal: 20,
        // borderWidth: 1,
        // borderColor: "red"
    },
    titleText: {
        paddingRight: 20
    },
    descriptionText: {
        textAlign: 'justify',
        paddingTop: 5,
        paddingBottom: 15,
        textIndent: 20,
    },
    astrobotImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        //borderColor: colors.blueBell
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(191, 171, 147, 0.5)',
        borderRadius: 25,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    }
});

export default PredictionList;