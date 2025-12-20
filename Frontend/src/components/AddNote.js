import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSave = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Saved", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="noteTitleForm" className="form-label">
          Note title
        </label>
        <input
          value={note.title}
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
          value={note.description}
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
          value={note.tag}
        />
      </div>
      <button
        disabled={note.title.length < 1 || note.description.length < 1}
        type="submit"
        className="btn"
        style={{backgroundColor: "#EBD5AB", color:"black"}}
        onClick={handleSave}
      >
        Add Note
      </button>
    </form>
  );
}

export default AddNote;
