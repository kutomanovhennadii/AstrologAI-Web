import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import PredictionContent from './PredictionContent';
import CalendarButtons from './CalendarButtons';
import Zodiak from './Zodiak';
import Menu from './Menu'
import Profile from '../profile/Profile'

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

import LanguageForm from '../language/LanguageForm';
import ContentSelector from '../content/ContentSelector'
import { useUser } from '../../../context/UserContext';

import useButtonSelection from '../../../hooks/useButtonSelection';

const buttonsBottom = [
    { label: 'Person', iconName: 'account' },
    { label: 'Zodiac', iconName: 'dharmachakra' },
    { label: 'Menu', iconName: 'menu' },
];

const Prediction = ({ navigation }) => {
    const { user, setUser } = useUser();
    const [selectedBottom, handleSelectionChangeBottom] = useButtonSelection(buttonsBottom);
    const [selectedZodiac, setSelectedZodiac] = useState(null);

    const handleZodiacSelection = (zodiacName) => {
        setSelectedZodiac(zodiacName);
        handleSelectionChangeBottom("");
        setUser(prevUser => ({
            ...prevUser,
            zodiacSign: zodiacName
        }));
    };

    console.log("Render Prediction");

    return (
        <View style={[inputStyles.size100, { flex: 1 }]}>
            <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container>

            {selectedBottom === 'Person' && <PredictionContent />}
            {selectedBottom === '' && <PredictionContent selectedZodiac={selectedZodiac} />}
            {selectedBottom === 'Zodiac' && <Zodiak onZodiacSelected={handleZodiacSelection} />}
            {selectedBottom === 'Menu' && <Menu />}

            <CalendarButtons
                buttons={buttonsBottom}
                selected={selectedBottom}
                onSelectionChange={handleSelectionChangeBottom}
            />
        </View>);
};

export default Prediction;