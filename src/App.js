import React, { useState } from 'react';
import Questions from './components/Questions';
import Forms from './components/Forms'
import Button from '@material-ui/core/Button';
import TestPage from './Quiz/TestPage';

const App = () => {
  const [show, setShow] = useState(false);

  // return (
  //   <div className="App">
  //      <TestPage/>
  //   </div>
  // );
  return (
    <div className="App">
        <Button variant="contained" color="primary" onClick={() => setShow(!show)}>
         { show ?  'Show Questions' : 'Show Form'}
    </Button>
     { show ? (<Forms />) : (<Questions />)}
    </div>
  );
}

export default App;
