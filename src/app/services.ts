import { ILoginData, IFormData, IPatrolData } from "@/models";

//USER
export const login: (arg: ILoginData) => Promise<string> = async (loginData) => {
    //get the data from the DB
    //check if its match
    //return the currect status and hash for the local storage

    return '';
};

export const logout: (email: string) => Promise<void> = async (email) => {
    //delete the local storage

};

export const autoLogin: () => Promise<any> = async () => {
    //get the local storage if esxist
    //fetch the db
    //match
    //return the status
};


//STATUS FORM
export const checkCode: (code: string) => Promise<boolean | ''> = async (code: string) => {
    try {
        console.log('code', code);
        //@ts-ignore
        const { data } = await getQrCode();
        console.log('uniq code', data);
        //@ts-ignore
        return data === code;
    } catch (error) {
        return '';
    }
};

export const sendForm: (formData: IFormData) => Promise<any> = async (formData) => {
    try {
        const response = await fetch("/api/patrols", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        console.log(result);
        //after status 200 from the DB need to trig the not server.
        
    } catch (error) {
        
    }
    //return status 200
};

export const getAllPatrols: () => Promise<IPatrolData[]> = async () => {
    return [];
};


//QR 

export const getQrCode: () => Promise<string> = async () => {
    try {
        const uniqCode = await fetch('/api/qr-code', { method: 'POST' });
        return uniqCode.json();
    } catch (error) {
        return '';
    }
};

// export const changeQrCode = async () => {
export const changeQrCode: () => Promise<string> = async () => {
    try {
        const newCode = _generateUniqueCode();
        const response = await fetch("/api/qr-code", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: newCode }),
        });
        const data = await response.json();
        return data.code;
    } catch (error) {
        console.log(error);
    }
};


//UTILS
const _generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueCode = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueCode += characters[randomIndex];
    }
    return uniqueCode;
};
