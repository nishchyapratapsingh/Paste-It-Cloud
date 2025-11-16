import { useState } from "react";
import noteContext from "./noteContext";
const notesInitial = [];
const NoteState = (props) => {
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmNjBjMTU2NmMwZTgyZTYyNzMxMjkiLCJpYXQiOjE3NjMzMTUyODUsImV4cCI6MTc2MzMxODg4NX0.wmSbOthciXKVmKbxGFIXrXxr_WeBGSq-dCGU9jkRfXM",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmNjBjMTU2NmMwZTgyZTYyNzMxMjkiLCJpYXQiOjE3NjMzMTUyODUsImV4cCI6MTc2MzMxODg4NX0.wmSbOthciXKVmKbxGFIXrXxr_WeBGSq-dCGU9jkRfXM",
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
    // const note = {
    //   _id: "68ba928f7a8120023495e5d6f",
    //   user: "688f60c1566c0e82e6273129",
    //   title: title,
    //   description: desc,
    //   tags: tag,
    //   date: "2025-09-05T07:34:39.055Z",
    //   __v: 0,
    // };
    // setNotes(notes.concat(note));
  };
  const deleteNote = async(id) => {
    const url = `${HOST}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmNjBjMTU2NmMwZTgyZTYyNzMxMjkiLCJpYXQiOjE3NjMzMTUyODUsImV4cCI6MTc2MzMxODg4NX0.wmSbOthciXKVmKbxGFIXrXxr_WeBGSq-dCGU9jkRfXM"
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmNjBjMTU2NmMwZTgyZTYyNzMxMjkiLCJpYXQiOjE3NjMzMTUyODUsImV4cCI6MTc2MzMxODg4NX0.wmSbOthciXKVmKbxGFIXrXxr_WeBGSq-dCGU9jkRfXM",
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
