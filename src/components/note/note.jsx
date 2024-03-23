import React from 'react';
import './note.css';

export const Note = (props) => {
  return (
    <div className="Note" id={props.id}>
      <p>{props.text}</p>
      <a
        href="#0"
        className="Note__control-delete"
        onClick={props.onDeleteClick}
      >&times;
      </a>
    </div>
  );
}