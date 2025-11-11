import React, {useEffect, useState, useRef} from "react";
import { User } from "../types";
import { UserItem } from "./UserItem";
import { useUserContext } from "../contexts/UserContext";
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import '../styles/DragDropContainer.css';
import { useNavigate } from "react-router-dom";

const DragUserItem: React.FC<{
    user:User;
    listType: 'general' | 'selected';
    onUserClick: (user:User)=>void;
}> = ({ user, listType, onUserClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        return combine(
            draggable({ element, 
                getInitialData: () => ({ user, listType }),
                onDragStart: () => setIsDragging(true),
                onDrop: () => setIsDragging(false),
            }),
        );
    }, [user, listType]);

    return (
        <div ref={ref}>
            <UserItem user={user} onUserClick={onUserClick} isDragging={isDragging} />
        </div>
    );
}

const DropZone: React.FC<{
    title: string;
    listType: 'general' | 'selected';
    users: User[];
    onUserClick: (user:User)=>void;
}> = ({ title, listType, users, onUserClick }) => {
    const { dispatch } = useUserContext();
    const ref = useRef<HTMLDivElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        return combine(
            dropTargetForElements({
                element,
                getData: () => ({ listType }),
                onDragEnter: () => setIsDragOver(true),
                onDragLeave: () => setIsDragOver(false),
                onDrop:({source, location}) => {
                    const data = source.data;
                    console.log('Dropped data:', data);
                    if(data.user && data.listType !== listType) {
                        console.log(`Moving user ${data.user.id} to ${listType} list`);
                        dispatch({ type: 'MOVE:USER', payload: { userId: data.user.id, toList: listType } });
                    }
                }
            }),
        );
    }, [listType, dispatch]);

    useEffect(() => {
    }, [listType, dispatch]);

    return (
        <div className="list-container">
            <h2>{title}</h2>
            <div ref={ref} className={`droppable-area ${isDragOver ? 'dragging-over' : ''}`}>
                {users.map(user => (
                    <DragUserItem key={user.id} user={user} listType={listType} onUserClick={onUserClick} />
                ))}
            </div>
        </div>
    );
}



export const DragDropContainer: React.FC = () => {
    const {state} = useUserContext();
    const navigate = useNavigate();

    const handleUserClick = (user: User) => {
        navigate(`/user/${user.id}`);
    };

    return (
        <div className="drag-drop-container">
            <DropZone title="Lista general" listType="general" users={state.generalUsers} onUserClick={handleUserClick}/>
            <DropZone title="Grupo seleccionado" listType="selected" users={state.selectedUsers} onUserClick={handleUserClick}/>
        </div>
    );
}