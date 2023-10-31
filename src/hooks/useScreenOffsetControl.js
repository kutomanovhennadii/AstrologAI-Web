// useScreenOffsetControl.js

// Импорт необходимых хуков и компонентов из React и React Native
import { useState, useEffect, useRef } from 'react';
import { Keyboard, PanResponder } from 'react-native';
import { LayoutAnimation, UIManager } from 'react-native';

// Экспериментальная функция для Android, чтобы LayoutAnimation работала корректно
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// Основной хук для управления смещением экрана
export const useScreenOffsetControl = () => {
    // Состояния и рефы для хранения различных параметров
    const [screenOffset, setScreenOffset] = useState(0);  // текущее смещение экрана
    const currentScreenOffsetRef = useRef(0);  // реф для текущего смещения
    const maxScreenOffsetRef = useRef(0);  // максимальное смещение
    const dynamicContentHeightRef = useRef(0);  // высота динамического контента
    const standardContextHeightRef = useRef(0);  // стандартная высота контента
    const keyboardHeightRef = useRef(0);  // высота клавиатуры
    const keyboardVisibleRef = useRef(false);  // видимость клавиатуры
    const inputFieldOffset = useRef(0);  // смещение поля ввода

    // Обновление высоты динамического контента
    const updateContentHeight = (newHeight) => {
        // console.log("updateContentHeight");
        if (Math.abs(dynamicContentHeightRef.current - newHeight) > 0.5) {
            dynamicContentHeightRef.current = newHeight;
            if (standardContextHeightRef.current == 0) {
                standardContextHeightRef.current = newHeight;

            }
            recalculateScreenOffset();
        }
    };

    // Переменная для хранения предыдущего смещения
    let previousOffset = 0;

    // Обработчик жестов
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: (_, gestureState) => {
                previousOffset = currentScreenOffsetRef.current;
            },

            onPanResponderMove: (_, gestureState) => {
                let newOffset = Math.min(0, Math.max(previousOffset + gestureState.dy, maxScreenOffsetRef.current));
                updateScreenOffset(newOffset);
            },
        })
    ).current;

    // Эффект для слушания событий клавиатуры
    useEffect(() => {
        // Событие отрывания клавиатуры
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                //console.log("keyboardDidShow");
                keyboardVisibleRef.current = true;
                if (keyboardHeightRef.current == 0) {
                    keyboardHeightRef.current = e.endCoordinates.height - 50;
                    //console.log("keyboardHeightRef = ", keyboardHeightRef.current);
                }

                recalculateScreenOffset();
            }
        );

        // Событие закрывания клавиатуры
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                keyboardVisibleRef.current = false;
                currentScreenOffsetRef.current = 0;
                recalculateScreenOffset();
            }
        );

        // Деструктор
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Установка смещения поля ввода
    const setFieldOffset = (value) => {
        //console.log("setFieldOffset ", value);
        inputFieldOffset.current = value;
        recalculateScreenOffset();
    };

    // Обновление смещения экрана
    const updateScreenOffset = (value) => {
        setScreenOffset(value);
        currentScreenOffsetRef.current = value;
    };

    // Пересчет смещения экрана
    const recalculateScreenOffset = () => {
        //console.log("recalculateScreenOffset ");

        // Применяем анимацию для плавного смещения
        LayoutAnimation.easeInEaseOut();

        // Вычисляем базовое значение для смещения, вычитая высоту динамического контента из стандартной высоты контента
        const baseValue = standardContextHeightRef.current - dynamicContentHeightRef.current;

        // Вычисляем дельту, которая будет максимальным возможным смещением
        // Если клавиатура видима, вычитаем из базового значения высоту клавиатуры
        const delta = baseValue - (keyboardVisibleRef.current ? keyboardHeightRef.current : 0);

        // Устанавливаем максимальное смещение
        maxScreenOffsetRef.current = delta;

        // Вычисляем исправленное значение смещения
        // Если клавиатура видима, добавляем к базовому значению смещение поля ввода
        let correctedValue = 0;
        if (inputFieldOffset.current <= 0) {
            correctedValue = baseValue + (keyboardVisibleRef.current ? inputFieldOffset.current : 0);
        } else if (baseValue < 0) {
            correctedValue = 0;
        }

        // Обновляем текущее смещение экрана
        updateScreenOffset(correctedValue);

        //Выводим отладочную информацию
        // console.log(
        //     "recalculateScreenOffset: keyboardVisible =", keyboardVisibleRef.current,
        //     "\n                         dynamicContentHeightRef =", dynamicContentHeightRef.current,
        //     "\n                         standartContextHightRef =", standardContextHeightRef.current,
        //     "\n                         baseValue =", baseValue,
        //     "\n                         Delta =", delta,
        //     "\n                         CorrectedValue =", correctedValue,
        //     "\n                         MaximalScreenOffset =", maxScreenOffsetRef.current,
        //     "\n                         ScreenOffset =", currentScreenOffsetRef.current
        // );
    };

    // Возвращаем все необходимые параметры и методы
    return [screenOffset, setFieldOffset, panResponder, updateContentHeight];
};