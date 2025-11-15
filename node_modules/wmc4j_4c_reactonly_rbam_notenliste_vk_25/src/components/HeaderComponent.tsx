import type {ISafeUser} from "../models/auth.interfaces.ts";
import {Button, Stack} from "@mui/material";

interface Props {
    currentUser: ISafeUser | undefined,
    setCurrentUser: (user: ISafeUser | undefined) => void
}

export const HeaderComponent:React.FC<Props> = ({currentUser,setCurrentUser}) => {
    console.log("HeaderComponent: currentUser=", currentUser);


    const handleLogin = async (username:string, password:string) => {
        console.log("HeaderComponent: handleLogin:username=", username, password);
        setCurrentUser(currentUser);
    }

    const handleLogout = () => {
    //Todo
        setCurrentUser(undefined);
    }

    //Todo Render
    return (
        <>
            <h1>Mitarbeit Blog</h1>

            <Stack direction="row" justify="space-between">
                <p>Bitte anmelden!</p>
                <Button variant="contained" color="primary" onClick={handleLogin}>LOGIN AS TEACHER</Button>
                <Button variant="contained" color={"secondary"} onClick={handleLogin}>LOGIN AS STUDENT_1</Button>
                <Button variant="contained" color={"secondary"} onClick={handleLogin}>LOGIN AS STUDENT_2</Button>
            </Stack>
        </>
    );
};