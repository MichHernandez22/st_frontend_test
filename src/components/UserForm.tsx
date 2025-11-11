// src/components/UserForm/UserForm.tsx
import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { NewUser, User } from '../types';
import '../styles/UserForm.css';

export const UserForm: React.FC = () => {
  const { dispatch } = useUserContext();
  const [formData, setFormData] = useState<NewUser>({
    name: { first: '', last: '' },
    email: '',
    picture: '',
    gender: '',
    location: { city: '', state: '', country: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular una pequeña demora para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      gender: formData.gender,
      name: {
        title: '',
        first: formData.name.first,
        last: formData.name.last,
      },
      email: formData.email,
      location: {
        street: {
          number: '',
          name: '',
        },
        city: formData.location.city,
        state: formData.location.state,
        country: formData.location.country,
        postcode: '',
      },
      picture: {
        thumbnail: formData.picture || 'https://picsum.photos/150',
        medium: formData.picture || 'https://picsum.photos/150',
        large: formData.picture || 'https://picsum.photos/150',
      },
    };

    dispatch({ type: 'ADD_USER', payload: newUser });
    
    // Reset form
    setFormData({
      name: { first: '', last: '' },
      email: '',
      picture: '',
      gender: '',
      location: { city: '', state: '', country: '' }
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Usuario</h2>
      
      {showSuccess && (
        <div className="form-success">
          Usuario agregado exitosamente!
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name.first">Nombre:</label>
          <input
            type="text"
            id="name.first"
            name="name.first"
            value={formData.name.first}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name.last">Apellido:</label>
          <input
            type="text"
            id="name.last"
            name="name.last"
            value={formData.name.last}
            onChange={handleChange}
            placeholder="Ingresa el apellido"
            required
            minLength={2}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="usuario@ejemplo.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Género:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location.city">Ciudad:</label>
          <input
            type="text"
            id="location.city"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            placeholder="Ciudad"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location.state">Estado:</label>
          <input
            type="text"
            id="location.state"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
            placeholder="Estado"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location.country">País:</label>
        <input
          type="text"
          id="location.country"
          name="location.country"
          value={formData.location.country}
          onChange={handleChange}
          placeholder="País"
          required
        />
      </div>

      <div className="form-group optional">
        <label htmlFor="picture">URL de Imagen:</label>
        <input
          type="url"
          id="picture"
          name="picture"
          value={formData.picture}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <button 
        type="submit" 
        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Agregando...' : 'Agregar Usuario'}
      </button>
    </form>
  );
};