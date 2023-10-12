import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

import Container from '../common/Container';
import AstrologAIText from '../common/AstrologAIText';



const StartPage = () => {
    const topOffset = 400;

    return (
        <Container topOffset={topOffset}>
            <AstrologAIText />
        </Container>
    );
};



export default StartPage;