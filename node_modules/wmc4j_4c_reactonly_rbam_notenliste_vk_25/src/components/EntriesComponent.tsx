import type {ISafeUser} from "../models/auth.interfaces.ts";

interface Props {
    currentUser:ISafeUser | undefined;
}

export default function EntriesComponent({currentUser}: Props) {
    console.log("EntriesComponent:EntriesComponent:currentUser=", currentUser);

    //Todo

    //Todo Render
    return (
        <>
        </>
  );
}
