import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import '../../styles/UserDetail.css';

export const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state } = useUserContext();

    const user = state.generalUsers.concat(state.selectedUsers).find(u => u.id === id);

    if (!user) {
        return (
            <div className="user-detail">
                <div className='error-container'>
                    <h2>Usuario no encontrado</h2>
                    <button onClick={() => navigate('/')} className='back-button'>Volver</button>
                </div>              
            </div>
        );
    }

    return (
        <div className='user-detail'>
            <div className='user-detail-header'>
                <button className="back-button" onClick={() => navigate('/')}>Volver</button>
                <h1>Detalle del Usuario</h1>
            </div>            
            {/* Detalles del usuario se mostrarán aquí */}
            <div className='user-detail-card'>
                <div className='user-profile-section'>
                    <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className='user-detail-avatar' />
                </div>
                <div className='user-basic-info'>
                    <h1>{user.name.first} {user.name.last}</h1>
                    <p className='user-email'>{user.email}</p>
                    <div className='user-badges'>
                        <span className={`badge badge-${user.gender}`}>{user.gender === 'male' ? 'Masculino' : user.gender === 'female' ? 'Femenino' : 'Otro'}</span>
                        <span className="badge badge-location">{user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}, {user.location.postcode}</span>
                    </div>
                </div>              
            </div>

            <div className="detail-section">
                <h3>Información del Sistema</h3>
            <div className="detail-item">
                <strong>ID del usuario:</strong>
                <span className="user-id">{user.id}</span>
            </div>
            <div className="detail-item">
                <strong>Lista actual:</strong>
                 <span className="user-id">
                    {state.generalUsers.some(u => u.id === user.id) 
                    ? 'Lista General' 
                    : 'Grupo Seleccionado'}
                </span>
            </div>
            </div>
           
            
        </div>
    );
}
