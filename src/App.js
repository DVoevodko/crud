import React, { useEffect } from 'react';
import './App.css';
import {Note} from './components/note/note';
import {Form} from './components/form/form';
import initFetch from './initFetch';
import { useState } from 'react';
const { get, post, del } = initFetch('http://localhost:7070/');


function App() {
  const [state, setState] = useState({
    notes: [],
    form: { text: 'Input You note' }
  });

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    setState(prevState => ({ ...prevState, form: { ...state.form, [name]: value } }));
  }

  const handleFormSubmit = (form) => {
    post('notes/', { text: form.text })
      .then((data) => {
        setState(prevState => ({ ...prevState, notes: data }));
      })
      .catch((error) => console.log("Could not upload the note", error));

    setState(prevState => ({ ...prevState, form: { text: '' } }));
  }

  const handleDeleteClick = (id) => {
    del(`notes/${id}`, { text: state.form.text })
      .then((data) => {
        setState(prevState => ({ ...prevState, notes: data }));
      })
      .catch((error) => console.log("Could not delete the note", error));
  }

  const loadData = () => {
    get('notes/')
      .then((data) => {
        setState(prevState => ({ ...prevState, notes: data }));
        //console.log(data);
      })
      .catch((error) => console.log("Could not load notes", error));
  }
 
  useEffect(loadData,[]);

  return (
    <div className="App">
      <div className="App-wrapper">
        <h1 className="App-title">Notes</h1>
        <div className="App-notes-container">
          {state.notes.map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                text={note.text}
                onDeleteClick={() => handleDeleteClick(note.id)}
              />
            );
          })}
        </div>
        <Form
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
          form={state.form}
        />
      </div>
    </div>
  );
}
export default App;