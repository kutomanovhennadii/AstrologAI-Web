import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import PredictionContent from './PredictionContent';
import CalendarButtons from './CalendarButtons';
import Zodiak from './Zodiak';
import Menu from './Menu'

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

import useButtonSelection from '../../../hooks/useButtonSelection';

const buttonsBottom = [
    { label: 'Person', iconName: 'account' },
    { label: 'Zodiac', iconName: 'dharmachakra' },
    { label: 'Menu', iconName: 'menu' },
];

const Prediction = ({ navigation }) => {
    const [selectedBottom, handleSelectionChangeBottom] = useButtonSelection(buttonsBottom);

    console.log("Render Prediction");

    return (
        <View style={[inputStyles.size100, { flex: 1 }]}>
            <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container>

            {/* <PredictionContent /> */}

            {/* <Zodiak /> */}

            <Menu />

            <CalendarButtons
                buttons={buttonsBottom}
                selected={selectedBottom}
                onSelectionChange={handleSelectionChangeBottom}
            />
        </View>);
};

export default Prediction;