import { useEffect, useState } from 'react';
import appConfig from '../static/json/appConfig.json'; // Путь к вашему appConfig

const imageContext = require.context('../static/image', true);
import { useUser } from '../context/UserContext';

const useAstrobotImages = () => {
    const [astrobotImages, setAstrobotImages] = useState([]);
    const { user, setUser } = useUser();

    useEffect(() => {
        const astrobots = appConfig[user.language].Astrobots;
        const loadedImages = astrobots.reduce((acc, astrobot) => {
            acc[astrobot.name] = imageContext('./' + astrobot.image);
            return acc;
        }, {});

        setAstrobotImages(loadedImages);
    }, []);

    return astrobotImages;
};

export default useAstrobotImages;