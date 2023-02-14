import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import modeContext from '../context/mode/modeContext';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { createNote } = context; // using context api to call the createnote function in noteStste.js // using context api to acess state in other file no need to pass props down to all the component

  const newContext = useContext(modeContext);
  const { mode } = newContext;
  const [note, setNote] = useState({ title: "", description: "", tag: "", })

  const handleClick = (e) => {
    e.preventDefault();
    createNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    //console.log("title:" + note.title + "  desc:" + note.description + "  tag:" + note.tag);
    props.showAlert("Note Added Sucessfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12">
            <form className="">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Notes-title:</label>
                <input type="text" className="form-control" id="title" name='title' placeholder="title" value={note.title} onChange={onChange} minLength={5} required style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'
                }} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea className="form-control" id="description" name="description" placeholder="Enter something here" rows="3" value={note.description} onChange={onChange} minLength={5} required style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'
                }} />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag:</label>
                <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onChange} required style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'
                }} />
              </div>
              <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className={`btn btn-${mode==='dark'? 'secondary': 'primary'}`} onClick={handleClick}> Add Note</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote