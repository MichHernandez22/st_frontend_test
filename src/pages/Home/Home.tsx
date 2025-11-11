import React from 'react';
import { DragDropContainer } from '../../components/DragDropContainer/DragDropContainer';
import { Loading } from '../../components/Loading/Loading';
import { useUserContext } from '../../contexts/UserContext';

export const Home: React.FC = () => {
    const { loading, error } = useUserContext();
    
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error al cargar los usuarios.</div>;
    }
    
    return (
        <div>
            <header>
                <h1>Gestion de Usuarios</h1>
            </header>   
            <div>
                <DragDropContainer/>
            </div>
        </div>
    );
}