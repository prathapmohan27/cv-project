import React, { useState } from 'react';
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

function Experience() {
  // constructor() {
  //   super();
  //   this.state = {
  // exp: {
  //   position: '',
  //   company: '',
  //   experience: '',
  //   city: '',
  // },
  //     data: [],
  //     index: '',
  //     isActive: true,
  //     isEdit: true,
  //   };
  // }
  const [exp, setExp] = useState({
    position: '',
    company: '',
    experience: '',
    city: '',
  });
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(' ');
  const [isEdit, setIsEdit] = useState(true);
  const [className, setClassName] = useState('unActive');

  const validation = () => {
    const { position, company, experience, city } = exp;
    if (!position || !company || !experience || !city) {
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
    setExp({
      position: '',
      company: '',
      experience: '',
      city: '',
    });
    setClassName('unActive');
    setIndex(' ');
    setIsEdit(true);
  };
  const handleChange = (e) => {
    setExp({ ...exp, [e.target.name]: e.target.value });
  };
  const handleEdit = (e) => {
    showForm();
    setExp(Object.assign(data[Number(e.target.id)]));
    setIndex(e.target.id);
    setIsEdit(false);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (validation()) {
      let temp = data;
      if (!isEdit) {
        temp[Number(index)] = exp;
        setData([...temp]);
        close();
        return;
      }
      temp.push(exp);
      setData([...temp]);
      close();
    }
  };

  const { position, company, experience, city } = exp;

  return (
    <div className="container">
      <h1>Experience</h1>
      <DisplayExp info={data} edit={handleEdit} />
      <div>
        <button className="addButton" onClick={showForm}>
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
            onChange={handleChange}
          />
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            name="company"
            value={company}
            id="company"
            onChange={handleChange}
          />

          <label htmlFor="experience">Experience:</label>
          <input
            type="text"
            name="experience"
            value={experience}
            id="experience"
            onChange={handleChange}
          />

          <label htmlFor="City">City:</label>
          <input
            type="text"
            name="city"
            value={city}
            id="city"
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

export default Experience;
