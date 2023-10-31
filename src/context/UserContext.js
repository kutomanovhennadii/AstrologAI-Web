import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState({
        name: '',
        zodiacSign: null,
        login: true,
        registrated: true,
        astrobot: "Bruce",
        language: 'English',
        generalContent: true,
        businessContent: true,
        relationContent: true,
        healthContent: false,
        aspectsContent: false,
        gender: "male",
        birthDate: "1966-09-04",  
        birthTime: "00:53:28",
        birthCountry: "Ukraine",
        birthCity: "Kharkov",
        biography: '',
    });

    // Следим за изменениями состояния `user` и выводим его в консоль
    useEffect(() => {
        console.log('User state changed:', user);
        // Здесь вы можете добавить POST запрос к серверу
    }, [user]);

    // Обертка над setUserState для логгирования
    const setUser = (newState) => {
        setUserState(newState);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};