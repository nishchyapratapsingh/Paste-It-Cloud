import { useState } from "react";
import noteContext from "./noteContext";
const notesInitial = [];
const NoteState = (props) => {
  const AUTHTKN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmNjBjMTU2NmMwZTgyZTYyNzMxMjkiLCJpYXQiOjE3NjM1MzE1NTAsImV4cCI6MTc2MzUzNTE1MH0.zo0XM2RA5Tjvvsim2p-Z7sD5H7g1FpnauNnbAuGgEuY";
  const HOST = "http://localhost:5000";
  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    const url = `${HOST}/api/notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
              `${AUTHTKN}`
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setNotes(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  const addNote = async (title, desc, tag) => {
    const url = `${HOST}/api/notes/createnote`;
    const data = { title, description: desc, tags: tag };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
`${AUTHTKN}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      const note = {
        "title" : title,
        "description" : desc,
        "tags" : tag
      };
      setNotes(notes.concat(note));
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteNote = async(id) => {
    const url = `${HOST}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${AUTHTKN}`
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, desc, tag) => {
    const url = `${HOST}/api/notes/updatenote/${id}`;
    const data = { title, description: desc, tags: tag };
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
`${AUTHTKN}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        element.title = title;
        element.description = desc;
        element.tags = tag;
      }
    }
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
