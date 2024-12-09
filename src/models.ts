
export interface ILoginData {
    username: string;
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
    createdAt : Date | string
};
export interface IPatrolDataFromDB {
    names: string;
    isStatusOk: boolean;
    description?: string;
    createdAt :Date| string;
    _id: string
};