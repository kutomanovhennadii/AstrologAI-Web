import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';
import SubscriptionPage from './SubscriptionPage'

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

import { sendUserInfoToServer } from '../../services/sendUserInfoToServer'
import useBackHandler from '../../hooks/useBackHandler';

import { useSendUserInfo } from '../../hooks/useSendUserInfo';

export const SubscriptionScreenWrapper = ({ navigation }) => {
    const onSubmit = () => {
        //console.log("SubscriptionScreenWrapper onSubmitSubscription")
        // navigation.navigate('GreetingForm');
    }

    const onBack = () => {
        //console.log("SubscriptionScreenWrapper onSubmitSubscription")
        navigation.navigate('Astrobots');
    }

    return <Subscription onSubmit={onSubmit} onBack={onBack} />;
};

const Subscription = ({ onSubmit, onBack }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { user, setUser } = useUser();
    const { sendUserInfo, loading } = useSendUserInfo();
    const [authError, setAuthError] = useState(null);

    const subscribtionText = appConfig[user.language]["Subscribtion"]
    const commonText = appConfig[user.language]["common"];

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

    const onSubmitForm = async (values) => {
        //console.log('Subscription onSubmitForm values:', values);
        const response = await sendUserInfo('user_data/', {
            subscriptionPerMonth: values.subscriptionPerMonth,
            subscriptionPerYear: values.subscriptionPerYear,
            subscriptionType: values.subscriptionType,
        });
        console.log('Subscription onSubmitForm response:', response); 

        if (!response.success) {
            setAuthError(response.error);
        }
        else {
            onSubmit();
        }
    };

    useBackHandler(onBack);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    //console.log("Render GreetingForm, currentPage = " + currentPage);
    return (
        <View style={[styles.container]}>
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={subscribtionText}
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
                {subscribtionText.map((_, i) => {
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
        bottom: -10,
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