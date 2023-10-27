import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik, Form } from 'formik';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScrollingText from '../../common/ScrollingText';
import CheckboxLabel from '../../common/CheckboxLabel'
import SubmitButton from '../../common/SubmitButton';
import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';

import CalendarButtons from './CalendarButtons';
import PredictionList from './PredictionList';

import termsOfUseJson from '../../../static/json/termsOfUse.json';
import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';



import useAstrobotImages from '../../../hooks/loadAstrobotImages';


const termsArray = termsOfUseJson.TermOfUse;
const termsText = termsArray.join('\n\n');


//const termsText = "Lorem ipsum dolor sit amet consectetur. Purus eget rhoncus egestas adipiscing parturient ut nec ut gravida. Enim urna aenean eu id quisque diam mattis morbi. Imperdiet turpis nunc porta neque at ullamcorper dignissim. Diam fermentum quam blandit enim enim sed adipiscing. Vitae eu cras faucibus viverra in eget. A consequat aliquam cursus nulla aliquam molestie mattis sit tristique. Massa etiam id in malesuada morbi. Faucibus nunc quam adipiscing tellus facilisis. Neque leo nulla quis leo. Proin sagittis adipiscing vitae feugiat neque mattis ac. Commodo a habitant pellentesque a pellentesque lacinia cum dolor tortor. Sollicitudin id lectus ut libero at. Nunc massa congue fames non. Sit lectus integer platea orci elementum habitasse. Vitae sagittis orci eros aliquam cursus. Tortor facilisis mauris ipsum ut magna. Ac vel commodo lectus elementum et sem. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor. Rutrum mauris id habitant a at tristique at cursus ut. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor."

const buttonsTop = [
    { label: 'Day', iconName: 'calendar' },
    { label: 'Week', iconName: 'calendar-week' },
    { label: 'Month', iconName: 'calendar-month' },
];

const buttonsBottom = [
    { label: 'Person', iconName: 'account' },
    { label: 'Zodiac', iconName: 'dharmachakra' },
    { label: 'Menu', iconName: 'menu' },
];

const prediction = {
    'Day': {
        title: '27.10.2023',
        astrobot: 'Bruce',
        description: "Lorem ipsum dolor sit amet consectetur. Purus eget rhoncus egestas adipiscing parturient ut nec ut gravida. Enim urna aenean eu id quisque diam mattis morbi. Imperdiet turpis nunc porta neque at ullamcorper dignissim. Diam fermentum quam blandit enim enim sed adipiscing. Vitae eu cras faucibus viverra in eget. A consequat aliquam cursus nulla aliquam molestie mattis sit tristique. Massa etiam id in malesuada morbi. Faucibus nunc quam adipiscing tellus facilisis. Neque leo nulla quis leo. Proin sagittis adipiscing vitae feugiat neque mattis ac. Commodo a habitant pellentesque a pellentesque lacinia cum dolor tortor. Sollicitudin id lectus ut libero at. Nunc massa congue fames non. Sit lectus integer platea orci elementum habitasse. Vitae sagittis orci eros aliquam cursus. Tortor facilisis mauris ipsum ut magna. Ac vel commodo lectus elementum et sem. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor. Rutrum mauris id habitant a at tristique at cursus ut. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor."
    },
    'Week': {
        title: '20.10.2023 - 27.10.2023',
        astrobot: 'Alex',
        description: "Lorem ipsum dolor sit amet consectetur. Purus eget rhoncus egestas adipiscing parturient ut nec ut gravida. Enim urna aenean eu id quisque diam mattis morbi. Imperdiet turpis nunc porta neque at ullamcorper dignissim. Diam fermentum quam blandit enim enim sed adipiscing. Vitae eu cras faucibus viverra in eget. A consequat aliquam cursus nulla aliquam molestie mattis sit tristique. Massa etiam id in malesuada morbi. Faucibus nunc quam adipiscing tellus facilisis. Neque leo nulla quis leo. Proin sagittis adipiscing vitae feugiat neque mattis ac. Commodo a habitant pellentesque a pellentesque lacinia cum dolor tortor. Sollicitudin id lectus ut libero at. Nunc massa congue fames non. Sit lectus integer platea orci elementum habitasse. Vitae sagittis orci eros aliquam cursus. Tortor facilisis mauris ipsum ut magna. Ac vel commodo lectus elementum et sem. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor. Rutrum mauris id habitant a at tristique at cursus ut. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor."
    }, 
    'Month': {
        title: '01.10.2023 - 31.10.2023',
        astrobot: 'Eva',
        description: "Lorem ipsum dolor sit amet consectetur. Purus eget rhoncus egestas adipiscing parturient ut nec ut gravida. Enim urna aenean eu id quisque diam mattis morbi. Imperdiet turpis nunc porta neque at ullamcorper dignissim. Diam fermentum quam blandit enim enim sed adipiscing. Vitae eu cras faucibus viverra in eget. A consequat aliquam cursus nulla aliquam molestie mattis sit tristique. Massa etiam id in malesuada morbi. Faucibus nunc quam adipiscing tellus facilisis. Neque leo nulla quis leo. Proin sagittis adipiscing vitae feugiat neque mattis ac. Commodo a habitant pellentesque a pellentesque lacinia cum dolor tortor. Sollicitudin id lectus ut libero at. Nunc massa congue fames non. Sit lectus integer platea orci elementum habitasse. Vitae sagittis orci eros aliquam cursus. Tortor facilisis mauris ipsum ut magna. Ac vel commodo lectus elementum et sem. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor. Rutrum mauris id habitant a at tristique at cursus ut. Tortor eleifend lacus vestibulum et lacus amet. A at varius est massa interdum. Pharetra donec id facilisi in sed ut. Pellentesque sem ipsum augue in tincidunt ornare quam pulvinar in. Tortor quam nisi gravida dignissim. Tellus velit proin auctor quis tortor."
    },
}



const useButtonSelection = (initialButtons, externalHandler) => {
    const [selected, setSelected] = useState(initialButtons[0].label);

    const handleSelectionChange = (newSelection) => {
        console.log(`Selected: ${newSelection}`);
        setSelected(newSelection);
        if (externalHandler) {
            externalHandler(newSelection);
        }
    };

    return [selected, handleSelectionChange];
};

const Prediction = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const calculatedHeight = screenHeight - 220;

    const [selectedTop, handleSelectionChangeTop] = useButtonSelection(buttonsTop);
    const [selectedBottom, handleSelectionChangeBottom] = useButtonSelection(buttonsBottom);

    const astrobotImages = useAstrobotImages();

    const getArticlesByKey = (predictionArray, key) => {
        return predictionArray.filter(article => article[key] !== undefined).map(article => article[key]);
    };

    const onLoadMore = () => {
        console.log("Prediction onLoadMore")
    };

    console.log("Render Prediction");

    return (
        <View style={[inputStyles.size100, { flex: 1 }]}>
            <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container>

            <CalendarButtons
                buttons={buttonsTop}
                selected={selectedTop}
                onSelectionChange={handleSelectionChangeTop}
            />

            <View style={{ flex: 1 }}>
                <PredictionList
                    articles={getArticlesByKey([prediction, prediction], "Week")}
                    onLoadMore={onLoadMore}
                    astrobotImages={astrobotImages} />
            </View >

            <CalendarButtons
                buttons={buttonsBottom}
                selected={selectedBottom}
                onSelectionChange={handleSelectionChangeBottom}
            />
        </View>);
};

const styles = StyleSheet.create({
    paddingTop: {
        //top: -15
    }
})


export default Prediction;