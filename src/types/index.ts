
export interface IUser {
    fullName: string;
    _id: string;
    email: string;
    friends: string[]
    // passwordHash: string;
    avatarUrl?: string,
    city?: string,
    age?: string,
    university?: string,
}

export interface IPost {
    _id: string;
    text: string;
    viewsCount: number;
    user: IUser;
    imageUrl: string,
    createdAt: string;
}

export interface IFormLoginValues {
    email: string;
    password: string;
}

export interface IFormRegisterValues {
    fullName: string;
    email: string;
    password: string;
}

export type LoadingStatus = "loading" | "loaded" | "error"