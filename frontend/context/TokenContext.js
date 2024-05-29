import React, {createContext, useContext} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({children}) => {

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (token !== null) {
                return token;
            } else {
                throw new Error('Token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
            throw error;
        }
    };

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('jwtToken', token);
        } catch (e) {
            console.log(e.message)
        }
    };

    return (
        <TokenContext.Provider value={{getToken, storeToken}}>
            {children}
        </TokenContext.Provider>
    );
};
