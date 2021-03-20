import React from "react";
import "./App.css";
import SideMenu from "../components/SideMenu"
import { CssBaseline, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import Project from "../Pages/Project";

const useStyle = makeStyles({
  appMain:{
    paddingLeft: '320px',
    width: '100%'
  }
})


function App() {
  const classes = useStyle();
  return (
    <>
     {/* <SideMenu /> */}
     <Header/>
      <div className={classes.appMain}>
        {/* <Header/> */}
      </div>
      <Project/>
      <CssBaseline /> {/* common css rules: icons to upper right, margin */}
    </>
  );
}

export default App;
