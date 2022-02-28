import React, { useState } from 'react';
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

function EducationInfo() {
  const [edu, setEdu] = useState({
    course: '',
    clgName: '',
    startYear: '',
    endYear: '',
    city: '',
  });
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(' ');
  const [isEdit, setIsEdit] = useState(true);
  const [className, setClassName] = useState('unActive');

  const validation = () => {
    const { course, clgName, startYear, endYear, city } = edu;
    if (!course || !clgName || !startYear || !endYear || !city) {
      alert('Please make sure all fields');
      return false;
    }
    return true;
  };

  const cancel = (e) => {
    e.preventDefault();
    close();
  };

  const showForm = () => {
    setClassName(' ');
  };

  const close = () => {
    setEdu({
      course: '',
      clgName: '',
      startYear: '',
      endYear: '',
      city: '',
    });
    setClassName('unActive');
    setIndex(' ');
    setIsEdit(true);
  };

  const handleEdit = (e) => {
    showForm();
    setEdu(Object.assign(data[Number(e.target.id)]));
    setIndex(e.target.id);
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setEdu({ ...edu, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validation()) {
      let temp = data;
      if (!isEdit) {
        temp[Number(index)] = edu;
        setData([...temp]);
        close();
        return;
      }
      temp.push(edu);
      setData([...temp]);
      close();
    }
  };

  const { course, clgName, startYear, endYear, city } = edu;

  return (
    <div className="container">
      <h1>Education</h1>
      <DisplayEdu info={data} edit={handleEdit} />
      <div>
        <button onClick={showForm} className="addButton">
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
            onChange={handleChange}
          />
          <label htmlFor="clgName">Collage Name:</label>
          <input
            type="text"
            name="clgName"
            id="clgName"
            value={clgName}
            onChange={handleChange}
          />
          <label htmlFor="startYear">Start Year:</label>
          <input
            type="text"
            name="startYear"
            id="startYear"
            value={startYear}
            onChange={handleChange}
            placeholder="2017"
          />
          <label htmlFor="endYear">End Year:</label>
          <input
            type="text"
            name="endYear"
            id="endYear"
            value={endYear}
            placeholder="2021"
            onChange={handleChange}
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={handleChange}
          />
          <div className="buttonContainer">
            <button onClick={submitForm} className="saveButton" type="submit">
              save
            </button>
            <button onClick={cancel} className="cancelButton">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EducationInfo;
