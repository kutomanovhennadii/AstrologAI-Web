import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';


import PredictionList from './PredictionList'; // Предполагается, что этот компонент импортирован
import CalendarButtons from './CalendarButtons'; // Предполагается, что этот компонент импортирован
import useButtonSelection from '../../hooks/useButtonSelection';
import useAstrobotImages from '../../hooks/loadAstrobotImages';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import { sendToServer } from '../../services/sendToServer'

import appConfig from '../../static/json/appConfig.json';
import { useUser } from '../../context/UserContext';
import { nextArticles } from '../../database/articlesManager';

const imageContext = require.context('../../static/image', true);

const buttonsTop = [
    { label: 'Day', iconName: 'calendar' },
    { label: 'Week', iconName: 'calendar-week' },
    { label: 'Month', iconName: 'calendar-month' },
];

const PredictionContent = ({ selectedZodiac }) => {
    //console.log('PredictionContent selectedZodiac:', selectedZodiac);

    const [selectedTop, handleSelectionChangeTop] = useButtonSelection(buttonsTop);
    const { user } = useUser();
    const [astrobotImages, setAstrobotImages] = useState([]);
    const [articles, setArticles] = useState([]);

    // Загрузка изображений 
    const astrobots = appConfig[user.language].Astrobots;

    useEffect(() => {
        const loadedImages = astrobots.reduce((acc, astrobot) => {
            acc[astrobot.name] = imageContext('./' + astrobot.image);
            return acc;
        }, {});
        setAstrobotImages(loadedImages);
    }, []);

    useEffect(() => {
        loadArticles();
    }, [selectedTop, selectedZodiac, user]);

    const loadArticles = async () => {
        const recipient = selectedZodiac ? selectedZodiac : user.name;
        const articleType = selectedTop[0].toUpperCase(); 

        const newArticles = await nextArticles(user, recipient, articleType, 0);
        //console.log('Load articles:', newArticles);
        setArticles(newArticles);
    };

    const onLoadMore = async () => {
        const recipient = selectedZodiac ? selectedZodiac : user.name;
        const articleType = selectedTop[0].toUpperCase();

        //console.log('Load more articles:', recipient, articleType);
        const newArticles = await nextArticles(user, recipient, articleType);
        setArticles(prevArticles => [...prevArticles, ...newArticles]);
    };

    return (
        <View style={[inputStyles.size100, { flex: 1 }]}>
            <CalendarButtons
                buttons={buttonsTop}
                selected={selectedTop}
                onSelectionChange={handleSelectionChangeTop}
            />

            <View style={{ flex: 1 }}>
                <PredictionList
                    articles={articles}
                    onLoadMore={onLoadMore}
                    astrobotImages={astrobotImages}
                    selectedZodiac={selectedZodiac}
                />
            </View >
        </View>
    );
};

export default PredictionContent;