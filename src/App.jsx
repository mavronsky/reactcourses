import { useState } from 'react';

import styles from './App.module.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
function App() {
  const [showCreateCourses, setShowCreateCourses] = useState(false);

  const toggleComponent = () => {
    setShowCreateCourses(!showCreateCourses);
  };

  return (
    <div className={styles.App}>
      <Header />
      {showCreateCourses ? (
        <CreateCourse
          toggleComponent={toggleComponent}
          showCreateCourses={showCreateCourses}
        />
      ) : (
        <Courses toggleComponent={toggleComponent} />
      )}
    </div>
  );
}

export default App;
