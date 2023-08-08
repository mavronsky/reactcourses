import React, { useState, useMemo } from 'react';
import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import { createButtonStyle } from '../../styles';
import { pipeDuration } from '../../helpers/pipeDuration';
import { createAddNewCourseButtonText } from '../../constants';

const Courses = ({ toggleComponent }) => {
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

  return (
    <div className={styles.courses}>
      <div className={styles.searchbar}>
        <SearchBar onSubmit={handleSearchSubmit} />
        <Button
          style={createButtonStyle}
          text={createAddNewCourseButtonText}
          onClick={toggleComponent}
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
