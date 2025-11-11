import React from "react";
import { User } from "../../types";

interface UserItemProps {
    user: User;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
    return (
        <div>
            <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
        </div>  
    );
}