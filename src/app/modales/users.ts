export interface IUser {
    login: string,
    email?: string,
    psw: string,
    cardNumber?: string,
    newPsw?: string,
    newPswRepeat?: string
}

export const USER_STORE_NAME = 'user';

export const TOKEN_NAME = 'token';