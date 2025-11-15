import {TLoginUser} from "../models/auth.types";
import {ISafeUser, IUser} from "../models/auth.interfaces";
import {mock_users} from "../mockdata/mock_users";
import {Hash} from "node:crypto";

export const authLogin = (loginUser:TLoginUser):ISafeUser | undefined => {
    console.log("authLogin:", loginUser);
    //Todo
    const user:IUser | undefined= mock_users.find((user:IUser) => {

        if (user.username === loginUser.username && user.password === loginUser.password) {
            return user;
        }

        return null;

    });

    if (!user) {
        return undefined;
    }

    const safeUser: IUser = user;
    return safeUser;
}