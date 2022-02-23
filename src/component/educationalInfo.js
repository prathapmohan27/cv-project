import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenFancy } from '@fortawesome/free-solid-svg-icons';

function DisplayEdu(props) {
  return (
    <div>
      {props.info.map((obj, i) => {
        return (
          <div className="Detail" key={i}>
            <p className="year">
              {obj.startYear} - {obj.endYear}
            </p>
            <div className="subInfo">
              <h3>{obj.course}</h3>
              <p>{obj.clgName}</p>
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

class EducationInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      edu: {
        course: '',
        clgName: '',
        startYear: '',
        endYear: '',
        city: '',
      },
      data: [],
      index: '',
      isActive: true,
      isEdit: true,
    };
  }
  validation = () => {
    const { course, clgName, startYear, endYear, city } = this.state.edu;
    if (!course || !clgName || !startYear || !endYear || !city) {
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
      edu: {
        course: '',
        clgName: '',
        startYear: '',
        endYear: '',
        city: '',
      },
      isActive: true,
      isEdit: true,
      index: '  ',
    });
  };

  handleEdit = (e) => {
    this.showForm();
    this.setState({
      isEdit: false,
      index: e.target.id,
      edu: Object.assign(this.state.data[Number(e.target.id)]),
    });
  };

  handleChange = (e) => {
    this.setState({
      edu: { ...this.state.edu, [e.target.name]: e.target.value },
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    if (this.validation()) {
      let temp = this.state.data;
      if (!this.state.isEdit) {
        temp[Number(this.state.index)] = this.state.edu;
        this.setState({ data: [...temp] });
        this.close();
        return;
      }
      temp.push(this.state.edu);
      this.setState({ data: [...temp] });
      this.close();
    }
  };

  render() {
    const { course, clgName, startYear, endYear, city } = this.state.edu;
    let className = '';
    if (this.state.isActive) {
      className = 'unActive';
    } else {
      className = '';
    }

    return (
      <div className="container">
        <h1>Education</h1>
        <DisplayEdu info={this.state.data} edit={this.handleEdit} />
        <div>
          <button onClick={this.showForm} className="addButton">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Education
            Details
          </button>
          <form className={className}>
            <label htmlFor="course">Course:</label>
            <input
              type="text"
              name="course"
              id="course"
              value={course}
              onChange={this.handleChange}
            />
            <label htmlFor="clgName">Collage Name:</label>
            <input
              type="text"
              name="clgName"
              id="clgName"
              value={clgName}
              onChange={this.handleChange}
            />
            <label htmlFor="startYear">Start Year:</label>
            <input
              type="text"
              name="startYear"
              id="startYear"
              value={startYear}
              onChange={this.handleChange}
              placeholder="2017"
            />
            <label htmlFor="endYear">End Year:</label>
            <input
              type="text"
              name="endYear"
              id="endYear"
              value={endYear}
              placeholder="2021"
              onChange={this.handleChange}
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
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

export default EducationInfo;
