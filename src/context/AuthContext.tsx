import React, { createContext, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { authReducer, AuthState } from './authReducer';

import cafeApi from "../api/cafeApi";
import { 
    Usuario, 
    LoginResponse, 
    LoginData, 
    RegisterData 
} from '../interfaces/appInterfaces';

import { useEffect } from "react";


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp:      (obj: RegisterData) => void;
    signIn:      (obj: LoginData) => Promise<void>
    logOut:      () => void;
    removeError: () => void;
}


const authIninitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({children}: any) => {
    
    const [state, dispatch] = useReducer(authReducer, authIninitialState)


    useEffect(() => {
        
        checkToken();

    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        // No token, no autenticado
        if (!token) return dispatch({ type: 'notAuthenticated' });
        
        // Hay token
        const resp = await cafeApi.get('/auth')
        if (resp.status !== 200) {
            return dispatch({type: 'notAuthenticated'});
        }

        await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type: 'signUp', 
            payload: {
                token: resp.data.token, 
                user: resp.data.usuario
            }
        });
    }

    const signUp = async({nombre, correo, password}: RegisterData) => {

        try {
            
            const resp = await cafeApi.post<LoginResponse>('/usuarios', {nombre, correo, password});
            dispatch({type: 'signUp', payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }});

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (err) {
            console.log(err);
            dispatch({
                type: 'addError', 
                payload: err.response.data.msg || 'Informacion incorrecta'})
        }

    };

    const signIn = async({correo, password}: LoginData) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
            dispatch({
                type: 'signUp', 
                payload: {
                    token: resp.data.token, 
                    user: resp.data.usuario
                }
            });

            await AsyncStorage.setItem('token', resp.data.token);
            
        } catch (err) {
            console.log(err.response.data.msg);
            dispatch({
                type: 'addError',
                payload: err.response.data.msg || 'Informacion incorrecta'
            })
        }
    };
    
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' })
    };
    
    const removeError = () => dispatch({type: 'removeError'});

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )
}