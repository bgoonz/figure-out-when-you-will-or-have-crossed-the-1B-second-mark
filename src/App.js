import { useState } from 'react';

import './App.css';

import { DobForm } from './dob-form';
import { CalculatedInfo } from './calculated-info';

function App() {
  const [dob, setDob] = useState(null);

  return (
    <div className="app">
      <h1 className="page-header">One Billion Seconds of Life</h1>

      {!dob && <DobForm onSubmit={setDob}/>}
      {dob && <CalculatedInfo timeOfBirth={dob} />}
    </div>
  );
}

export default App;
