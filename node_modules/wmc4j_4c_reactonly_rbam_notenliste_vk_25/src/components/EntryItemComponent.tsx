import type { IMitarbeitEntry } from "../models/interfaces.ts";
import type { ISafeUser } from "../models/auth.interfaces.ts";
import { Card, CardContent, Typography, Stack } from "@mui/material";

interface Props {
    entry: IMitarbeitEntry;
    currentUser: ISafeUser;
}

export default function EntryItemComponent({ entry, currentUser }: Props) {
    console.log("EntryItemComponent-entry=", entry);
    console.log("EntryItemComponent-currentUser=", currentUser);

    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6">{entry.username}</Typography>
                    <Typography variant="body2">Punkte: {entry.points}</Typography>
                    <Typography variant="caption">
                        {new Date(entry.createdAt).toLocaleDateString()}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}