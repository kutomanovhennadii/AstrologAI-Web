import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = async () => {
    try {
        console.log('Выход из системы');
        await AsyncStorage.removeItem('userToken');
        // Вы можете добавить здесь дополнительные действия, например, перенаправление пользователя на экран входа
    } catch (error) {
        console.error('Ошибка при попытке выйти из системы:', error);
    }
};

export default logout;