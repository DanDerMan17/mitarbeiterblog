
//Enum als Const-Type
export const Roles = {
    TEACHER: "Teacher",
    STUDENT: "Student"
} as const;
//Key: "LEHRER" | "SCHUELER"
export type TRoleKey = keyof typeof Roles;
//Value: "Lehrer" | "Schüler"
export type TRoleValue = typeof Roles[TRoleKey];

export type TLoginUser = {
    username: string
    password: string
}



