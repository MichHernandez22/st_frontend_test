import React, {useEffect, useState} from "react";
import { User } from "../../types";
import { UserItem } from "../UserItem/UserItem";
import { useUserContext } from "../../contexts/UserContext";

const DragUserItem: React.FC<{
    user:User;
    listType: 'general' | 'selected';
}> = ({ user, listType }) => {
    return (
        <div>
            <UserItem user={user} />
        </div>
    );
}

const DropZone: React.FC<{
    title: string;
    listType: 'general' | 'selected';
    users: User[];
}> = ({ title, listType, users }) => {
    const { dispatch } = useUserContext();

    useEffect(() => {
    }, [listType, dispatch]);

    return (
        <div>
            <h2>{title}</h2>
            <div>
                {users.map(user => (
                    <DragUserItem key={user.id} user={user} listType={listType} />
                ))}
            </div>
        </div>
    );
}



export const DragDropContainer: React.FC = () => {
    const {state} = useUserContext();

    return (
        <div>
            <DropZone title="Lista general" listType="general" users={state.generalUsers}/>
            <DropZone title="Grupo seleccionado" listType="selected" users={state.selectedUsers}/>
        </div>
    );
}