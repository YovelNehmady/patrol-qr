import { ILoginData, IFormData, IPatrolData, IPatrolDataFromDB } from "@/models";

//USER
export const login: (loginData: ILoginData) => Promise<string> = async (loginData) => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
        const result = await response.json();
        const token = result.data;
        return token;
    } catch (error) {
        console.log('error to login : ', error);
    }
};
export const autoLoginService: (userToken: string) => Promise<boolean> = async (userToken) => {
    try {
        const response = await fetch("/api/users/auto-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userToken }),
        });
        const { data } = await response.json();
        return data.isLoggedIn;
    } catch (error) {
        console.log('error to login : ', error);
        return false;
    }
};



export const logout = async () => {
    try {
        _removeLocalStorage();
    } catch (error) {
        console.error('error whith logout ', error);
    }
};

//STATUS FORM
export const checkCode: (code: string) => Promise<boolean> = async (code: string) => {
    try {
        const { data } = await getQrCode();
        return data === code;
    } catch (error) {
        console.log('error with check code', error);
        return false;
    }
};

export const sendForm: (formData: IFormData) => Promise<void> = async (formData) => {
    try {
        //TODO: type and handdle currect
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
        console.error('error with send form :', error);
    }
};

export const getAllPatrols: () => Promise<IPatrolDataFromDB[]> = async () => {
    try {
        const response = await fetch("/api/patrols", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const { data } = await response.json();
        const newData = data.map((patrol: IPatrolData) => {
            patrol.createdAt = _formatTimestamp(patrol.createdAt as Date)
            return patrol
        });        
        return newData;
    } catch (error) {
        console.log('error with get patrols  ', error);
        return [];
    }
};


//QR 

export const getQrCode: () => Promise<{ data: string; }> = async () => {
    try {
        const uniqCode = await fetch('/api/qr-code', { method: 'POST' });
        return uniqCode.json();
    } catch (error) {
        console.error('error with get qr code:', error);
    }
};

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
        console.error(error);
    }
};

//LOCAL STORAGE
const LOCAL_STORAGE_KEY = 'userStorage';
export const setLocalStorage = (token: string) => {
    try {
        const serializedValue = JSON.stringify(token); // Convert value to a JSON string
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedValue);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getLocalStorage = () => {
    try {
        const serializedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedValue === null) {
            return null; // Return null if the key doesn't exist
        }
        return JSON.parse(serializedValue) as string; // Parse the JSON string back into an object
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

const _removeLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};

//UTILS
const _formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0'); // Day with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour clock
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes with leading zero

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const _generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueCode = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueCode += characters[randomIndex];
    }
    return uniqueCode;
};