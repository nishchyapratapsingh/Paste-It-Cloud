import { useState } from "react";
import noteContext from "./noteContext";
const notesInitial = [
    {
        "_id": "688f68a4448afe4127af9cbd",
        "user": "688f60c1566c0e82e6273129",
        "title": "Hello World",
        "description": "This is my first note",
        "tags": "general",
        "date": "2025-08-03T13:48:20.477Z",
        "__v": 0
    },
    {
        "_id": "688f9cd40154dcd24b2b0edd",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:31:00.647Z",
        "__v": 0
    },
    {
        "_id": "688f9ce7236cca277fe1df6c",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:31:19.785Z",
        "__v": 0
    },
    {
        "_id": "688f9d0bd66c6c08de97132b",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:31:55.541Z",
        "__v": 0
    },
    {
        "_id": "688f9d0ed66c6c08de97132d",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:31:58.665Z",
        "__v": 0
    },
    {
        "_id": "688f9d218eb1f1fe49ef4c8d",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:32:17.650Z",
        "__v": 0
    },
    {
        "_id": "688f9d2d8eb1f1fe49ef4c8f",
        "user": "688f60c1566c0e82e6273129",
        "title": "Sleep habits 2",
        "description": "I should sleep 7-8 hours daily",
        "tags": "general",
        "date": "2025-08-03T17:32:29.829Z",
        "__v": 0
    },
    {
        "_id": "68ba928f7a8120023495ed6f",
        "user": "688f60c1566c0e82e6273129",
        "title": "Teacher's Day",
        "description": "New Note today",
        "tags": "general",
        "date": "2025-09-05T07:34:39.055Z",
        "__v": 0
    }
]

const NoteState = (props) => {
    const [notes, setNotes] = useState(notesInitial)
    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;