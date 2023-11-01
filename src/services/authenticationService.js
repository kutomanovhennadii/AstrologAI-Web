import { useUser } from '../context/UserContext';

const authenticateUser = ({ email, password }) => {

    // Dummy 
    const { user, setUser } = useUser();

    // В будущем здесь будет реальная проверка в базе данных
    // или отправка запроса на сервер.

    // Пока что просто выводим данные в консоль
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    // Возвращаем true
    if ((user.email === email) && (user.password === password))
        return true;
    else
        return false;
};

export default authenticateUser;