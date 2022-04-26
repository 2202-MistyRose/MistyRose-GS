import React from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
