import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState({
        name: 'hkutomanov',
        email: 'hhh@com',
        password: 'XShe$1234',
        zodiacSign: null,
        isAuthenticated: true,
        is_registration_completed: true,
        astrobot: "Bruce",
        language: 'Русский',
        generalContent: true,
        businessContent: true,
        relationContent: true,
        healthContent: false,
        aspectsContent: false,
        gender: "male",
        birth_date: "1966-09-04",
        birth_time: "00:53:28",
        birth_country: "Ukraine",
        birth_city: "Kharkov",
        biography: '',
        subscriptionType: 'Premium',
        subscriptionPerMonth: 0,
        subscriptionPerYear: 0,
        verificationCode: "1234",
        registratedDate: "2023-01-01",
    });

    // Следим за изменениями состояния `user` и выводим его в консоль
    useEffect(() => {
        //console.log('User state changed:', user);
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