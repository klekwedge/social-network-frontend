
export interface IUser {
    fullName: string;
    email: string;
    passwordHash: string;
    avatarUrl: string,
}

export interface IPost {
    _id: string;
    title: string;
    text: string;
    viewsCount: number;
    user: IUser
    imageUrl: string,
    createdAt: string
}

export interface IFormLoginValues {
    email: string;
    password: string;
}

export interface IFormRegisterValues {
    fullName: string;
    email: string;
    password: string;
};