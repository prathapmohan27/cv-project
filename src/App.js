import React from 'react';
import GeneralInfo from './component/generalInfo';
import './style/app.scss';
import EducationInfo from './component/educationalInfo';
import Experience from './component/experience';

class App extends React.Component {
  render() {
    return (
      <main>
        <h1 className="title">CV Application</h1>
        <GeneralInfo />
        <hr />
        <EducationInfo />
        <hr />
        <Experience />
      </main>
    );
  }
}
export default App;
