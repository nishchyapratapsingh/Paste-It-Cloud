import { useEffect } from "react";
import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";


const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
      getNotes()
    }, [])
    
  return (
    <div className="row my-3">
      {notes.map((note)=>{
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
  )
}

export default Notes
