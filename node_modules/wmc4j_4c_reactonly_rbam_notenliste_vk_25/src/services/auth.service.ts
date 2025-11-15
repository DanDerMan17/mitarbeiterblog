import type {TLoginUser} from "../models/auth.types.ts";
import type {ISafeUser} from "../models/auth.interfaces.ts";
import axios from "axios";

//Stub (Proxy)
export const api = axios.create({
    baseURL: "http://127.0.0.1:3001/api/auth",
    headers: {"Content-Type": "application/json"},
});

/**
 * Derzeit als Mock: returns SafeUser
 * Todo: Api POST Login (user, passwordHash): return safeUser
 * @param loginUser
 */


export const authLogin = async (loginUser: TLoginUser): Promise<ISafeUser | undefined> => {
    console.log("authLogin:", loginUser);

    //Todo
    const response = await api.post<ISafeUser>("/api/auth/login", loginUser);

    const safeUser:ISafeUser | undefined = response.data;
    return safeUser;
}