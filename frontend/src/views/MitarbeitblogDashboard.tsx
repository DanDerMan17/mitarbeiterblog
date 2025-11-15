import {useEffect, useState} from "react";
import type {ISafeUser} from "../models/auth.interfaces.ts";
import {HeaderComponent} from "../components/HeaderComponent.tsx";
import {Roles} from "../models/auth.types.ts";
import EntriesComponent from "../components/EntriesComponent.tsx";

export const MitarbeitblogDashboard = () => {
    console.log("MitarbeitblogDashboard");

    //Todo
    const [currentUser, setCurrentUser] = useState<ISafeUser | undefined>(undefined);
    const [loggedInUser, setLoggedInUser] = useState<ISafeUser[]>([]);

    useEffect(() => {
        setCurrentUser(currentUser);
    }, []);

    //Todo Render
    return (
        <>
            <HeaderComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>

            {currentUser && currentUser.roles.includes(Roles.TEACHER)}

            <EntriesComponent currentUser={currentUser}/>



        </>
    );
};