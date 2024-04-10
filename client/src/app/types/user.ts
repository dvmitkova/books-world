import { Book } from "./book";
import { Comment } from "./comment";

export interface User {
    books: Book[];
    comments: Comment[];
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