import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

import Astrobots from '../astrobots/Astrobots';
import Profile from '../profile/Profile';
import LanguageForm from '../language/LanguageForm';
import ContentSelector from '../content/ContentSelector';
import Subscription from '../subcsription/Subscription'
import { useUser } from '../../context/UserContext';
import DatePredictionForm from './DatePrediction'
import appConfig from '../../static/json/appConfig.json';
import useBackHandler from '../../hooks/useBackHandler';
import logout from '../../services/logout';

const Menu = ({ onBack }) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { user, setUser } = useUser();
    const menuNames = appConfig[user.language]["menuNames"];

    const onSubmitProfile = () => {
        //console.log('Profile button clicked');
        setSelectedMenu('Profile');
    };

    const onSubmitAstrobot = () => {
        //console.log('Astrobot button clicked');
        setSelectedMenu('Astrobot');
    };

    const onSetDate = () => {
        //console.log('Set date button clicked');
        setSelectedMenu('DatePrediction');
    };


    const onSubmitLanguage = () => {
        //console.log('Language button clicked');
        setSelectedMenu('Language');
    };

    const onSubmitContent = () => {
        //console.log('Content button clicked');
        setSelectedMenu('Content');
    };

    const onSubmitSubscription = () => {
        //console.log('Subscription button clicked');
        setSelectedMenu('Subscription');
    };

    const onSubmitLogout = async () => {
        console.log('Log out button clicked');
        setSelectedMenu('Logout');
        await logout();
        setUser(prevUser => ({
            ...prevUser,
            isAuthenticated: false
        }));
    };

    const resetMenu = () => {
        setSelectedMenu(null);
    };

    useBackHandler(onBack);

    return (
        <View style={styles.container}>
            {selectedMenu === null && (
                <>
                    <TouchableOpacity style={styles.button} onPress={onSetDate}>
                        <Text style={styles.text}>
                            {menuNames["Set date"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitProfile}>
                        <Text style={styles.text}>
                            {menuNames["Profile"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitAstrobot}>
                        <Text style={styles.text}>
                            {menuNames["Astrobot"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitLanguage}>
                        <Text style={styles.text}>
                            {menuNames["Language"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitContent}>
                        <Text style={styles.text}>
                            {menuNames["Content"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitSubscription}>
                        <Text style={styles.text}>
                            {menuNames["Subscription"]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitLogout}>
                        <Text style={styles.text}>
                            {menuNames["Log out"]}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedMenu === 'DatePrediction' && <DatePredictionForm onSubmit={resetMenu} onBack={resetMenu} />}
            {selectedMenu === 'Astrobot' && <Astrobots onSubmit={resetMenu} onBack={resetMenu} />}
            {selectedMenu === 'Profile' && <Profile onSubmit={resetMenu} onBack={resetMenu} />}
            {selectedMenu === 'Language' && <LanguageForm onSubmit={resetMenu} onBack={resetMenu} />}
            {selectedMenu === 'Content' && <ContentSelector onSubmit={resetMenu} onBack={resetMenu} />}
            {selectedMenu === 'Subscription' && <Subscription onSubmit={resetMenu} onBack={resetMenu} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: designConstants.borderRadius,
        backgroundColor: colors.darkBlue,
        borderWidth: 1,
        borderColor: colors.lightText,
        width: '100%',
        height: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    text: {
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: colors.lightText,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Raleway-SemiBold",
    },
});

export default Menu;