import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = ' http://localhost:5000';
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const getNotes = async () => {

        // api call

        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'Get', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        });
        const json = await response.json()
        console.log(json)
        setNotes(json);
    }

    // Add a Note // add not will take title description and tag  from the user to add a new note id and other things will be handeled by the backend
    
    const createNote = async (title, description, tag) => {
        // TODO: API Call
        //api call
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: 'Post', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note =await response.json()
        console.log(note);

        //logic

        console.log("Adding a new note");
        
        setNotes(notes.concat(note));
        console.log("new not is added");
    }


    // Delete a Note // use the filter function to remove 
    
    const deleteNote = async (id) => {
        // TODO: API Call

        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'Delete', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            // body data type must match "Content-Type" header
        });
        const json = response.json()
        console.log(json)

        //logic
        console.log("not with id" + id + "has been deleted");
        // to delete a not  using the fillter function it will filter the note with the given id
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    // Edit a Note it will take the id,title,description,and the tag to edit id will be used to find which one is needed to edit
   
      // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json);

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
    

    return (<noteContext.Provider value={{ notes, createNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </noteContext.Provider>)
}
export default NoteState;