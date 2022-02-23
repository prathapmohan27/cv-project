import React from 'react';
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

class GeneralInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        phNumber: '',
        url: '',
      },
      isActive: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.editForm = this.editForm.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ isActive: false });
  };

  editForm = () => {
    this.setState({ isActive: true });
  };

  render() {
    let className = '';
    let edit = 'editButton';
    if (!this.state.isActive) {
      className += ' unActive';
      edit += ' editActive';
    }
    const { firstName, lastName, phNumber, url } = this.state.form;
    return (
      <div className="generalContainer">
        <GeneralDisplay content={this.state.form} />
        <form onSubmit={this.submitForm} className={className}>
          <h2>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Personal Details
          </h2>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={this.handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={this.handleChange}
            placeholder="Last Name"
          />
          <input
            type="tel"
            value={phNumber}
            name="phNumber"
            onChange={this.handleChange}
            placeholder="Ph Number"
            required
          />
          <input
            type="url"
            value={url}
            name="url"
            onChange={this.handleChange}
            placeholder="personal link (github,portfolio)"
          />
          <div>
            <button className="saveButton" type="submit">
              Save
            </button>
          </div>
        </form>
        <div className={edit}>
          <button onClick={this.editForm}>
            <FontAwesomeIcon icon={faPenFancy}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  }
}

export default GeneralInfo;
