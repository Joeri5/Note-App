import "./Notes.css";
import {Component, useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

function Notes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            axios('notes/list', { method: 'GET' })
                .then(result => setNotes(result.data.content));
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, []);

    console.log(notes);

    return (
        <div className="notes">
            <div className="notes-grid">
                {notes.map(note => (<Note text={note.text} id={note.id} />))}
                <CreationNote text="" date="28/11/2021" />
            </div>
        </div>
    )
}

function CreationNote({text, date}) {
    const textAreaEl = useRef(null);

    const createNote = () => {
        const textOut = textAreaEl.current.value;
        axios.post('notes/create', {
            text: textOut
        }).then(result => result.data)
            .then(data => {
                toast[data.error ? 'error' : 'success'](data.message);
                textAreaEl.current.value = "";
            });
    };

    return (
        <div className="notes-note-creation">
            <div className="notes-note-container">
                <div className="notes-note-text">
                    <textarea ref={textAreaEl} rows={10} className="notes-note-textarea-creation" placeholder="Type to add note..." defaultValue={text} />
                </div>
                <div className="notes-note-action">
                    <span className="notes-note-date">
                        {date}
                    </span>
                    <svg onClick={createNote} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

function Note({text, id}) {
    const deleteNote = () => {
        axios.post('notes/delete', { id })
            .then(result => result.data)
            .then(data => {
                toast[data.error ? 'error' : 'success'](data.message);
            });
    }

    return (
        <div className="notes-note">
            <div className="notes-note-container">
                <div className="notes-note-text">
                    <textarea rows={10} className="notes-note-textarea" placeholder="Type to add note...">
                        {text}
                    </textarea>
                </div>
                <div className="notes-note-action">
                    <span className="notes-note-date">
                        {new Date().toLocaleString()}
                    </span>
                    <svg onClick={deleteNote} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Notes;