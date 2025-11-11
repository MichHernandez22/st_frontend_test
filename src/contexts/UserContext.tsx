import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { User, UserState } from "../types";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    //Efecto para carga inicial - SOLO UNA VEZ al montar
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        
        //Primero intentar cargar desde localStorage
        const savedState = localStorage.getItem('userState');
        
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Verificar que el estado guardado tiene la estructura correcta
          if (parsedState && parsedState.generalUsers && parsedState.selectedUsers) {
            dispatch({ type: 'LOAD_STATE', payload: parsedState });
            setIsInitialized(true);
            setLoading(false);
            return; //Salir si cargamos datos guardados
          }
        }
        
        // Si no hay datos guardados, cargar desde la API
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        
        const formattedUsers: User[] = data.results.map((user: any) => ({
          id: user.login.uuid,
          name: {
            first: user.name.first,
            last: user.name.last
          },
          email: user.email,
          picture: {
            thumbnail: user.picture.thumbnail,
            medium: user.picture.medium,
            large: user.picture.large
          },
          location: {
            city: user.location.city,
            state: user.location.state,
            country: user.location.country
          },
          gender: user.gender
        }));

        dispatch({ type: 'SET_USERS', payload: formattedUsers });
        setError(null);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error('Error al cargar los usuarios:', err);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []); //Solo se ejecuta una vez al montar

  // Efecto para guardar en localStorage - SOLO cuando el estado cambia Y está inicializado
  useEffect(() => {
    if (isInitialized && state.generalUsers.length > 0) {
      try {
        localStorage.setItem('userState', JSON.stringify(state));
      } catch (err) {
        console.error('Error salvando informacion en localStorage:', err);
      }
    }
  }, [state, isInitialized]); // Se ejecuta cuando el estado cambia

    
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