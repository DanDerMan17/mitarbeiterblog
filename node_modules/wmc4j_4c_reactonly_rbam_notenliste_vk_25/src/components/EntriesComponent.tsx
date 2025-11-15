import type { ISafeUser } from "../models/auth.interfaces.ts";
import { useEffect, useState } from "react";
import type { IMitarbeitEntry } from "../models/interfaces.ts";
import { getEntries } from "../services/entries.service.ts";
import EntryItemComponent from "./EntryItemComponent.tsx";
import { Stack, CircularProgress } from "@mui/material";

interface Props {
    currentUser: ISafeUser | undefined;
}

export default function EntriesComponent({ currentUser }: Props) {
    console.log("EntriesComponent:currentUser=", currentUser);

    const [entries, setEntries] = useState<IMitarbeitEntry[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadEntries();
        }
    }, [currentUser]);

    const loadEntries = async () => {
        setLoading(true);
        if (currentUser) {
            const data = await getEntries(currentUser.username, currentUser.roles[0]);
            setEntries(data);
        }
        setLoading(false);
    };

    if (!currentUser) {
        return <div>Bitte melden Sie sich an</div>;
    }

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Stack spacing={2}>
            {entries.map((entry) => (
                <EntryItemComponent key={entry.id} entry={entry} currentUser={currentUser} />
            ))}
        </Stack>
    );
}
