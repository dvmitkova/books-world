export interface User {
    _id: string;
    username: string;
    email: string;
    name: string;
    password: string;
    joined: string;
}

export interface UserForAuth {
    username: string;
    email: string;
    name: string;
    password: string;
    id: string;
}

export interface ProfileDetails {
    username: string;
    email: string;
    name: string;
}