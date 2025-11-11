import { useState, useEffect } from "react";
import { User } from "../types";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://randomuser.me/api/?results=10');
                const data = await response.json();

                const fetchedUsers: User[] = data.results.map((user: any) => ({
                    id: user.login.uuid,
                    name: {
                        title: user.name.title,
                        first: user.name.first,
                        last: user.name.last,
                    },
                    email: user.email,
                    gender: user.gender,
                    location: {
                        street: {
                            number: user.location.street.number,
                            name: user.location.street.name,
                        },
                        city: user.location.city,
                        state: user.location.state,
                        country: user.location.country,
                        postcode: user.location.postcode,
                    },
                    picture: {
                        large: user.picture.large,
                        medium: user.picture.medium,
                        thumbnail: user.picture.thumbnail,
                    },
                }));

                setUsers(fetchedUsers);
                setError(null);
            } catch (err) {
                setError('Error al cargar los usuarios');
                console.error('Error al cargar los usuarios',err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };

}