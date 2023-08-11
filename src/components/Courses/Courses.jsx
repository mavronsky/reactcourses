import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import { createButtonStyle } from '../../styles';
import { pipeDuration } from '../../helpers/pipeDuration';
import { createAddNewCourseButtonText } from '../../constants';

const Courses = ({ toggleComponent }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  const authorsMap = useMemo(() => getAuthorsMap(), []);

  const filteredCourses = useMemo(() => {
    if (searchQuery === '') {
      return mockedCoursesList;
    }
    const lowerCaseSearch = searchQuery.toLowerCase();
    return mockedCoursesList.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerCaseSearch) ||
        course.id.toString().includes(lowerCaseSearch)
    );
  }, [searchQuery]);

  const handleToAddCourse = () => {
    navigate('/courses/add');
  };

  return (
    <div className={styles.courses}>
      <div className={styles.searchbar}>
        <SearchBar value={searchQuery} onSubmit={handleSearchSubmit} />
        <Button
          style={createButtonStyle}
          text={createAddNewCourseButtonText}
          onClick={handleToAddCourse}
        />
      </div>

      {searchQuery === '' ? (
        mockedCoursesList.map(
          ({ id, title, description, duration, creationDate, authors }) => (
            <CourseCard
              key={id}
              title={title}
              description={description}
              duration={pipeDuration(duration)}
              creationDate={creationDate}
              authors={authors.map((authorId) => authorsMap[authorId])}
              id={id}
            />
          )
        )
      ) : filteredCourses.length === 0 ? (
        <div className={styles.no_matches}>No matches.</div>
      ) : (
        filteredCourses.map(
          ({ id, title, description, duration, creationDate, authors }) => (
            <CourseCard
              key={id}
              title={title}
              description={description}
              duration={pipeDuration(duration)}
              creationDate={creationDate}
              authors={authors.map((authorId) => authorsMap[authorId])}
              id={id}
            />
          )
        )
      )}
    </div>
  );
};

export default Courses;

function getAuthorsMap() {
  return mockedAuthorsList.reduce((acc, author) => {
    acc[author.id] = author.name;
    return acc;
  }, {});
}
