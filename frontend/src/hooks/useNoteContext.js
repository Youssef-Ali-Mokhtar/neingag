import { useContext } from "react";
import { noteContext } from "../store/note-context";

export const useNoteContext = ()=> {
    const context = useContext(noteContext);

    if(!context) {
        throw Error('useAuthContext must be used inside a useAutheContext provider')
    }

    return context;
}