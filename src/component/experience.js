import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenFancy } from '@fortawesome/free-solid-svg-icons';

function DisplayExp(props) {
  return (
    <div>
      {props.info.map((obj, i) => {
        return (
          <div className="Detail" key={i}>
            <p className="year">{obj.experience}</p>
            <div className="subInfo">
              <h3>{obj.position}</h3>
              <p>{obj.company}</p>
              <p>{obj.city}</p>
            </div>
            <div className="editButton">
              <button onClick={props.edit} id={i}>
                <FontAwesomeIcon
                  pointerEvents="none"
                  icon={faPenFancy}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class Experience extends React.Component {
  constructor() {
    super();
    this.state = {
      exp: {
        position: '',
        company: '',
        experience: '',
        city: '',
      },
      data: [],
      index: '',
      isActive: true,
      isEdit: true,
    };
  }
  validation = () => {
    const { position, company, experience, city } = this.state.exp;
    if (!position || !company || !experience || !city) {
      alert('Please make sure all fields');
      return false;
    }
    return true;
  };
  cancel = (e) => {
    e.preventDefault();
    this.close();
  };
  showForm = () => {
    this.setState({
      isActive: false,
    });
  };
  close = () => {
    this.setState({
      exp: {
        position: '',
        company: '',
        experience: '',
        city: '',
      },
      isActive: true,
      isEdit: true,
      index: '  ',
    });
  };
  handleChange = (e) => {
    this.setState({
      exp: { ...this.state.exp, [e.target.name]: e.target.value },
    });
  };
  handleEdit = (e) => {
    this.showForm();
    this.setState({
      isEdit: false,
      index: e.target.id,
      exp: Object.assign(this.state.data[Number(e.target.id)]),
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    if (this.validation()) {
      let temp = this.state.data;
      if (!this.state.isEdit) {
        temp[Number(this.state.index)] = this.state.exp;
        this.setState({ data: [...temp] });
        this.close();
        return;
      }
      temp.push(this.state.exp);
      this.setState({ data: [...temp] });
      this.close();
    }
  };
  render() {
    const { position, company, experience, city } = this.state.exp;
    let className = '';
    if (this.state.isActive) {
      className = 'unActive';
    } else {
      className = '';
    }
    return (
      <div className="container">
        <h1>Experience</h1>
        <DisplayExp info={this.state.data} edit={this.handleEdit} />
        <div>
          <button className="addButton" onClick={this.showForm}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Experience
            Details
          </button>
          <form className={className}>
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              name="position"
              value={position}
              id="position"
              onChange={this.handleChange}
            />
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              name="company"
              value={company}
              id="company"
              onChange={this.handleChange}
            />

            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              name="experience"
              value={experience}
              id="experience"
              onChange={this.handleChange}
            />

            <label htmlFor="City">City:</label>
            <input
              type="text"
              name="city"
              value={city}
              id="city"
              onChange={this.handleChange}
            />
            <div className="buttonContainer">
              <button
                onClick={this.submitForm}
                className="saveButton"
                type="submit"
              >
                save
              </button>
              <button onClick={this.cancel} className="cancelButton">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Experience;
