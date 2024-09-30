import React, { useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import Approuter from "./Router";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/store/userActions";
import Formatted from "./Formatted";

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVF+WmFZfVpgcl9DaFZSRWYuP1ZhSXxXdk1hUH9YdXxWRGhUUE0="
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("loggedInUser");

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        dispatch(setUserData(parsedUserData));
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, [dispatch]);
  
  return (
    <Router>
      <Formatted>
        <Approuter />
      </Formatted>
    </Router>
  );
};

export default App;
