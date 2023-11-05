import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import appConfig from '../../../static/json/appConfig.json';
import SubscriptionPage from './SubscriptionPage'

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

import { sendToServer } from '../../../services/sendToServer'

export const SubscriptionScreenWrapper = ({ navigation }) => {
    const onSubmitSubscription = () => {
        console.log("SubscriptionScreenWrapper onSubmitSubscription")
        navigation.navigate('GreetingForm');
    }

    return <Subscription onSubmit={onSubmitSubscription} />;
};

const Subscription = ({ onSubmit }) => {
    const [currentPage, setCurrentPage] = useState(0);

    //console.log(appConfig.Subscribtion);  

    const renderItem = ({ item }) => {
        //console.log("Rendering item with header text: " + item); 
        return (
            <SubscriptionPage
                data={item}
                onSubmit={onSubmitForm}
            />
        );
    };

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0];
            setCurrentPage(firstVisibleItem.index);
        }
    }, []);

    const onSubmitForm = async (subscriptionData) => {
        console.log("Subscription onSubmitForm");

        sendToServer('subscription', subscriptionData)
            .then(response => {
                console.log("Response from server", response);
            })
            .catch(error => {
                console.error("Error sending astrobot to server: ", error)
            });

        onSubmit()
    };

    //console.log("Render GreetingForm, currentPage = " + currentPage);
    return (
        <View style={[styles.container]}>
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={appConfig.Subscribtion}
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
        </View>
    );
};

const styles = StyleSheet.create({ 
    size100: {
        width: "100%",
        height: "100%",
    },

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
    activeDot: { backgroundColor: colors.textColor }, 
    inactiveDot: { backgroundColor: '#888' },
});

export default Subscription;