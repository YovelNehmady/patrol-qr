export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IFormData {
    names: string;
    isStatusOk: boolean;
    description?: string;
};

export interface IPatrolData {
    names: string;
    isStatusOk: boolean;
    description?: string;
    createdAt : Date
};