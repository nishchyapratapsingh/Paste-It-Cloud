import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleSave = (e)=> {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  const handleChange = (e)=> {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="noteTitleForm" className="form-label">
          Note title
        </label>
        <input
          type="text"
          className="form-control"
          id="noteTitleForm"
          name="title"
          onChange={handleChange}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="noteDescForm" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="noteDescForm"
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="noteTagForm" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="noteTagForm"
          name="tag"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSave}>
        Add Note
      </button>
    </form>
  );
}

export default AddNote;
