import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, UserState } from "../types";
import { useUsers } from "../hooks/useUsers";

interface UserContextType {
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
    loading: boolean;
    error: string | null;
}

type UserAction = 
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'ADD_USER'; payload: User }
    | { type: 'MOVE:USER'; payload: { userId: string, toList: 'general' | 'selected' } }
    | { type: 'LOAD_STATE'; payload: UserState };

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, generalUsers: action.payload };
        case 'ADD_USER':
            return { ...state, generalUsers: [...state.generalUsers, action.payload] };
        case 'MOVE:USER':
            const { userId, toList } = action.payload;
            const fromList = toList === 'general' ? 'selectedUsers' : 'generalUsers';
            const user = state[fromList].find(u => u.id === userId);
            if (!user) return state;
            return {
                ...state,
                [fromList]: state[fromList].filter(u => u.id !== userId),
                [toList === 'general' ? 'generalUsers' : 'selectedUsers']: [...state[toList === 'general' ? 'generalUsers' : 'selectedUsers'], user]
            };
        case 'LOAD_STATE':
            return action.payload;
        default:
            return state;
    }
};

const initialState: UserState = {
    generalUsers: [],
    selectedUsers: []
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { users, loading, error } = useUsers();

    //Efecto para cargar usuarios iniciales
    useEffect(() => {
        if (users.length > 0) {
            dispatch({ type: 'SET_USERS', payload: users });
        }
    }, [users]);

    //Persistencia con localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('userState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            //Solo carga estado si no tenemos usuarios ya cargados de la api
            if(state.generalUsers.length === 0){
                dispatch({ type: 'LOAD_STATE', payload: parsedState });
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userState', JSON.stringify(state));
    }, [state]);
    
    return (
        <UserContext.Provider value={{state, dispatch, loading, error}}>
            {children}
        </UserContext.Provider>
    )
};  

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext debe ser usado con UserProvider");
    }
    return context;
}