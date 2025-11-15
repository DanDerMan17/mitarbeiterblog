import type {IMitarbeitEntry} from "../models/interfaces.ts";
import axios from "axios";

export const api = axios.create( {
    baseURL: "http://127.0.0.1:3001/api/entries",
    headers: { "Content-Type": "application/json" },
});

export async function getEntries(): Promise<IMitarbeitEntry[]> {
    //Todo


    return [];
}
