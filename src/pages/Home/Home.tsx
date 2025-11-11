import React from 'react';
import { DragDropContainer } from '../../components/DragDropContainer';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../contexts/UserContext';
import { UserForm } from '../../components/UserForm';
import '../../styles/Home.css';

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
            <header className='page-header'>
                <h1>Gestion de Usuarios</h1>
            </header>   
            <div className="page-content">
                <aside className="sidebar">
                    <UserForm />
                </aside>
        
                <main className="main-content">
                    <DragDropContainer />
                </main>
            </div>
        </div>
    );
}