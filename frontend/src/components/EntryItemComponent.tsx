import type {IMitarbeitEntry} from "../models/interfaces.ts";
import type {ISafeUser} from "../models/auth.interfaces.ts";

interface Props {
  entry:IMitarbeitEntry;
  currentUser:ISafeUser;
}

export default function EntryItemComponent({entry,currentUser}: Props) {
    console.log("EntryItemComponent-entry=",entry);
    console.log("EntryItemComponent-currentUser=",currentUser);

    //Todo

    //Todo Render
  return (
        <>
        </>
    );
}
