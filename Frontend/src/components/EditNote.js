import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const EditNote = (props) => {
  const {currentNote, setCurrentNote} = props;

  const {editNote} = useContext(noteContext);

  const handleSave = (e)=> {
    e.preventDefault();
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etags);
  }
  const handleChange = (e)=> {
    setCurrentNote({...currentNote, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close mx-1 border border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{"backgroundColor": "#6c757d", "borderRadius": "50%", "color": "white"}}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="noteTitleEdit" className="form-label">
                    Note title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTitleEdit"
                    name="etitle"
                    value={currentNote.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="noteDescEdit" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteDescEdit"
                    name="edescription"
                    value={currentNote.edescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="noteTagEdit" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTagEdit"
                    name="etags"
                    value={currentNote.etags}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                disabled={currentNote.etitle.length<1 || currentNote.edescription.length<1}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
