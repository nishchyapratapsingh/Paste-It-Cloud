import noteContext from "./noteContext";
const state = {
    "name":"David",
    age : 23
}
const NoteState = (props) => {
    return(
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;