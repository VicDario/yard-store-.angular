export interface Credentials {
    email: string;
    password: string;
}
export interface Login {
    access_token: string;
}
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
