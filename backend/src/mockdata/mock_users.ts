import type {IUser} from "../models/auth.interfaces.ts";
import {Roles} from "../models/auth.types";

export  const mock_users:IUser[] = [
    {
        id: 1,
        username: "Teacher1",
        roles: [Roles.TEACHER],
        password: "password",
    },
    {
        id: 2,
        username: "Student1",
        roles: [Roles.STUDENT],
        password: "password",
    },
    {
        id: 3,
        username: "Student2",
        roles: [Roles.STUDENT],
        password: "password",
    }
]