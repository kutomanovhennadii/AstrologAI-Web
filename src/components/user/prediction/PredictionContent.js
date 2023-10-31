import React from 'react';
import { View, Dimensions } from 'react-native';
import PredictionList from './PredictionList'; // Предполагается, что этот компонент импортирован
import CalendarButtons from './CalendarButtons'; // Предполагается, что этот компонент импортирован
import useButtonSelection from '../../../hooks/useButtonSelection';
import useAstrobotImages from '../../../hooks/loadAstrobotImages';
import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

const buttonsTop = [
    { label: 'Day', iconName: 'calendar' },
    { label: 'Week', iconName: 'calendar-week' },
    { label: 'Month', iconName: 'calendar-month' },
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


const PredictionContent = ({ selectedZodiac }) => {
    const [selectedTop, handleSelectionChangeTop] = useButtonSelection(buttonsTop);

    const astrobotImages = useAstrobotImages();

    const getArticlesByKey = (predictionArray, key) => {
        return predictionArray.filter(article => article[key] !== undefined).map(article => article[key]);
    };

    const onLoadMore = () => {
        console.log("PredictionContent onLoadMore");
    };

    //console.log("Render PredictionContent, selectedZodiac", selectedZodiac);

    return (
        <View style={[inputStyles.size100, { flex: 1 }]}>
            <CalendarButtons
                buttons={buttonsTop}
                selected={selectedTop}
                onSelectionChange={handleSelectionChangeTop}
            />

            <View style={{ flex: 1 }}>
                <PredictionList
                    articles={getArticlesByKey([prediction, prediction], selectedTop)}
                    onLoadMore={onLoadMore}
                    astrobotImages={astrobotImages}
                    selectedZodiac={selectedZodiac}
                />
            </View >
        </View>
    );
};

export default PredictionContent;