import type { ISafeUser } from "../models/auth.interfaces.ts";
import { Button, Stack } from "@mui/material";
import { authLogin } from "../services/auth.service.ts";

interface Props {
    currentUser: ISafeUser | undefined;
    setCurrentUser: (user: ISafeUser | undefined) => void;
}

export const HeaderComponent: React.FC<Props> = ({ currentUser, setCurrentUser }) => {
    console.log("HeaderComponent: currentUser=", currentUser);

    const handleLogin = async (username: string, password: string) => {
        console.log("HeaderComponent: handleLogin:username=", username, password);
        const user = await authLogin({ username, password });
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(undefined);
    };

    if (!currentUser) {
        return (
            <>
                <h1>Mitarbeit Blog</h1>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <p>Bitte anmelden!</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogin("Teacher1", "password")}
                    >
                        LOGIN AS TEACHER
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleLogin("Student1", "password")}
                    >
                        LOGIN AS STUDENT_1
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleLogin("Student2", "password")}
                    >
                        LOGIN AS STUDENT_2
                    </Button>
                </Stack>
            </>
        );
    }

    return (
        <>
            <h1>Mitarbeit Blog</h1>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <p>Willkommen, {currentUser.username}!</p>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    LOGOUT
                </Button>
            </Stack>
        </>
    );
};
