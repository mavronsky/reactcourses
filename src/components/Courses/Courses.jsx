import { useState, useMemo } from 'react';

import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData';

import escapeRegExp from 'escape-string-regexp';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';
import { createButtonStyle } from '../../styles';
import { pipeDuration } from '../../helpers/pipeDuration';

import { createAddNewCourseButtonText } from '../../constants';

function Courses({ toggleComponent }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchRegex = useMemo(
    () => new RegExp(escapeRegExp(searchQuery), 'i'),
    [searchQuery]
  );

  const handleSearchClick = (searchText) => {
    setSearchQuery(searchText);
  };

  const authorsMap = useMemo(() => getAuthorsMap(), []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery) {
      return mockedCoursesList;
    }
    return mockedCoursesList.filter(
      (course) =>
        searchRegex.test(course.title) || searchRegex.test(course.id.toString())
    );
  }, [searchQuery, searchRegex]);

  return (
    <div className={styles.courses}>
      <div className={styles.searchbar}>
        <SearchBar
          value={searchQuery}
          onSubmit={setSearchQuery}
          onSearchClick={handleSearchClick}
        />
        <Button
          style={createButtonStyle}
          text={createAddNewCourseButtonText}
          onClick={toggleComponent}
        />
      </div>

      {filteredCourses.length === 0 ? (
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
}

export default Courses;

function getAuthorsMap() {
  return mockedAuthorsList.reduce((acc, author) => {
    acc[author.id] = author.name;
    return acc;
  }, {});
}
