import React from 'react';
import './form.css';

export const Form = (props) => {
  const {
    onSubmit: handleFormSubmit,
    onChange: handleInputChange,
    form,
    } = props;

    return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit(form);
      }}
    >
      <div className="Form-control">
        <label htmlFor="text">New note</label>
        <textarea
          className="Form-control__text"
          type="text"
          id="text"
          name="text"
          value={form.text}
          onChange={handleInputChange}
          rows="3"
          autoComplete="off"
          required
        />
      </div>
      <button
        className="Form-control__button-add"
        type="submit"
      >
        &#10148;
      </button>
    </form>  
  );
}