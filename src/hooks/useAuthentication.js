import { useUser } from '../context/UserContext';

export const useAuthentication = () => {
    const { user, setUser } = useUser();

    const authenticateUser = ({ email, password }) => {
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        if ((user.email === email) && (user.password === password)) {
            setUser(prevUser => ({
                ...prevUser,
                login: true
            }));
            return true;
        }
        return false;
    };

    return {
        authenticateUser
    };
};