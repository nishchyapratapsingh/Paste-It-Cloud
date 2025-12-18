import { useEffect} from "react";
import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useState } from "react";
import EditNote from "./EditNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const [currentNote, setCurrentNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const updateNote = (note) => {
    setCurrentNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etags: note.tags
    })
    window.bootstrap.Modal.getOrCreateInstance(
      document.getElementById("exampleModal")
    ).show();
  };

  return (
    <>
      <EditNote currentNote={currentNote} setCurrentNote={setCurrentNote}/>
      <div className="row my-3">
        <div className="container fs-5">
          {notes.length == 0 && 'Your notes will be displayed here'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
