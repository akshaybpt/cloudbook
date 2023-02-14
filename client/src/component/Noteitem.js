import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import modeContext from '../context/mode/modeContext';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const newContext = useContext(modeContext);
    const { mode, color, toggleMode } = newContext;
    const { deleteNote } = context;// using use context to acess the delete note/ edit note function in NoteState.js
    const { note, updateNote } = props;
    const date = new Date(note.date);

    return (
        <>

            <div className="col-12 col-md-6 col-lg-4">
                <Card className='my-2' bg={mode} text={color} border={mode === 'light' ? 'dark' : 'white'}>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Subtitle className={`mb-2 text-${mode === 'light' ? 'muted' : 'white-50'}`}>Tag: {note.tag}</Card.Subtitle>
                        <Card.Text>
                            {note.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small > Date: {date.toLocaleString()}</small>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Sucessfully", "success"); }}></i>

                        <i className="fa-regular fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}

export default Noteitem