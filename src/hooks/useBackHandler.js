import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// Создание кастомного хука useBackHandler
const useBackHandler = (onBackPress) => {
    useEffect(() => {
        // Функция обработки нажатия кнопки "Назад"
        const backAction = () => {
            onBackPress();
            return true; // Возвращение true предотвращает действие по умолчанию
        };

        // Подписываемся на событие нажатия кнопки "Назад"
        BackHandler.addEventListener('hardwareBackPress', backAction);

        // Очистка подписки
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [onBackPress]); // Перезапускать эффект, если функция onBackPress изменится
};

export default useBackHandler;