import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faUser } from '@fortawesome/free-solid-svg-icons';

function GeneralDisplay(props) {
  const { firstName, lastName, phNumber, url } = props.content;
  return (
    <div className="generalInfo">
      <h2>
        {firstName} {lastName}
      </h2>
      <p>{phNumber}</p>
      <a target="_blank" href={url} rel="noreferrer">
        {url}
      </a>
    </div>
  );
}

function GeneralInfo() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phNumber: '',
    url: '',
  });

  let [className, setClassName] = useState('');
  let [edit, setEdit] = useState('editButton');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setClassName((className = 'unActive'));
    setEdit((edit += ' editActive'));
  };

  const editForm = () => {
    setClassName((className = ' '));
    setEdit((edit = 'editButton'));
  };

  const { firstName, lastName, phNumber, url } = form;

  return (
    <div className="generalContainer">
      <GeneralDisplay content={form} />
      <form onSubmit={submitForm} className={className}>
        <h2>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Personal Details
        </h2>
        <input
          type="text"
          value={firstName}
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="tel"
          value={phNumber}
          name="phNumber"
          onChange={handleChange}
          placeholder="Ph Number"
          required
        />
        <input
          type="url"
          value={url}
          name="url"
          onChange={handleChange}
          placeholder="personal link (github,portfolio)"
        />
        <div>
          <button className="saveButton" type="submit">
            Save
          </button>
        </div>
      </form>
      <div className={edit}>
        <button onClick={editForm}>
          <FontAwesomeIcon icon={faPenFancy}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default GeneralInfo;
