import { useEffect, useState } from 'react';
import appConfig from '../static/json/appConfig.json'; // Путь к вашему appConfig

const imageContext = require.context('../static/image', true);

const useZodiacImages = () => {
    const [zodiacImages, setZodiacImages] = useState([]);

    useEffect(() => {
        const zodiacs = appConfig.Zodiacs; // Убедитесь, что у вас есть соответствующий ключ в вашем appConfig
        const loadedImages = zodiacs.reduce((acc, zodiac) => {
            acc[zodiac.name] = imageContext('./' + zodiac.image);
            return acc;
        }, {});

        setZodiacImages(loadedImages);
    }, []);

    return zodiacImages;
};

export default useZodiacImages;