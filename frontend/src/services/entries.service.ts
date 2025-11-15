import type { IMitarbeitEntry } from "../models/interfaces.ts";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:3001/api",
    headers: { "Content-Type": "application/json" },
});

export async function getEntries(username: string, role: string): Promise<IMitarbeitEntry[]> {
    try {
        const response = await api.get<IMitarbeitEntry[]>("/entries", {
            params: { username, role }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get entries:", error);
        return [];
    }
}