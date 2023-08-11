import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import styles from './App.module.css';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

function App() {
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/"
          element={<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        >
          <Route path="/" element={<Courses />} />
          <Route path="courseinfo/:id" element={<CourseInfo />} />
          <Route
            path="login"
            element={<Login registrationSuccessful={registrationSuccessful} />}
          />
          <Route
            path="registration"
            element={
              <Registration
                setRegistrationSuccessful={setRegistrationSuccessful}
              />
            }
          />
          <Route path="/courses/add/" element={<CreateCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
