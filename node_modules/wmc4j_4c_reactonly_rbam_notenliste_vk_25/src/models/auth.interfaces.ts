//  Interface mit Vererbung - Beispiel
// .1 ISafeUser: API-Response
// .2 IUser: Interne Speicherung in DB/Repo
//
// * IUser (mit passwordHash) → besser als interface (klarer Vertrag für ein Eingabeobjekt).
// * ISafeUser (ohne passwordHash) → Interface Vererbung besser als interface (klarer Vertrag für ein Eingabeobjekt).


import type {TRoleValue} from "./auth.types.ts";

//API
export interface ISafeUser {
    id: number
    username: string
    roles: TRoleValue[]
}
//Für DB: passwordHash
export interface IUser extends ISafeUser {
    passwordHash: string
}