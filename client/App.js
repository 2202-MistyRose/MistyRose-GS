import React from 'react';
import ButtonAppBar from './components/ButtonAppBar';
// import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      {/* <Navbar /> */}
      <Routes />
    </div>
  );
};

export default App;
