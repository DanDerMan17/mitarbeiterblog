import { useEffect, useState } from "react";
import type { ISafeUser } from "../models/auth.interfaces.ts";
import { HeaderComponent } from "../components/HeaderComponent.tsx";
import { Roles } from "../models/auth.types.ts";
import EntriesComponent from "../components/EntriesComponent.tsx";

export const MitarbeitblogDashboard = () => {
    console.log("MitarbeitblogDashboard");

    const [currentUser, setCurrentUser] = useState<ISafeUser | undefined>(undefined);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        // Component initialization
    }, []);

    return (
        <>
            <HeaderComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />

            {currentUser && currentUser.roles.includes(Roles.TEACHER) && (
                <div>Teacher View</div>
            )}

            <EntriesComponent currentUser={currentUser} />
        </>
    );
};