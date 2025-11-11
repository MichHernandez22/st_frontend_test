import React from "react";
import { User } from "../../types";
import '../../styles/UserItem.css';

interface UserItemProps {
    user: User;
    onUserClick: (user:User)=>void;
    isDragging?: boolean;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onUserClick, isDragging = false }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUserClick(user);
    };

    return (
        <div className={`user-item ${isDragging ? 'dragging' : ''}`} onClick={handleClick}>
            <img src={user.picture.thumbnail} className="user-avatar" />
            <div className="user-info">
                <h3 className="user-name">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h3>
                <p className="user-email">{user.email}</p>
            </div>
            <div className="item-actions">
                <span className="view-detail">Ver detalles</span>
                <div className="drag-handle">:::</div>  
            </div>
                      
        </div>  
    );
}