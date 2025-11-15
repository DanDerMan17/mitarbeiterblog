import type { TLoginUser } from "../models/auth.types.ts";
import type { ISafeUser } from "../models/auth.interfaces.ts";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:3001/api",
    headers: { "Content-Type": "application/json" },
});

export const authLogin = async (loginUser: TLoginUser): Promise<ISafeUser | undefined> => {
    console.log("authLogin:", loginUser);

    try {
        const response = await api.post<ISafeUser>("/auth/login", loginUser);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        return undefined;
    }
};