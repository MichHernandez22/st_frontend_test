export interface User {
    id: string;
    gender: string;
    name:{
        title: string;
        first: string;
        last: string;
    };
    email: string;
    location:{
        street:{
            number: string;
            name: string;
        };
        city:string;
        state:string;
        country:string;
        postcode:string;        
    };
    picture:{
        large:string;
        medium:string;
        thumbnail:string;
    }
}

export interface UserState {
    generalUsers: User[];
    selectedUsers: User[];
}

export interface NewUser{
    name:{
        first: string;
        last: string;
    };
    email: string;
    gender: string;
    picture?:string;
    location:{
        city:string;
        country:string;
        state:string;
    }
}