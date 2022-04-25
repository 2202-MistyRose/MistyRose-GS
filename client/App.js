import React from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Routes />
    </div>
  );
};

export default App;
