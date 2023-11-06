import { useEffect, useState } from 'react';
import appConfig from '../static/json/appConfig.json'; // Путь к вашему appConfig

const imageContext = require.context('../static/image', true);
import { useUser } from '../context/UserContext';

const useZodiacImages = () => {
    const [zodiacImages, setZodiacImages] = useState([]);
    const { user, setUser } = useUser();

    useEffect(() => {
        const zodiacs = appConfig[user.language].Zodiacs; // Убедитесь, что у вас есть соответствующий ключ в вашем appConfig
        const loadedImages = zodiacs.reduce((acc, zodiac) => {
            acc[zodiac.name] = imageContext('./' + zodiac.image);
            return acc;
        }, {});

        setZodiacImages(loadedImages);
    }, []);

    return zodiacImages;
};

export default useZodiacImages;