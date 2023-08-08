import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './CreateCourse.module.css';

import { getCurrentDateFormatted } from '../../helpers/dateGenerator';

import {
  createCourseButtonText,
  createCourseButtonAuthorText,
  addButtonText,
  deleteButtonText,
  descriptionPlaceholder,
  authorNamePlaceholder,
  durationPlaceholder,
  titlePlaceholder,
  descriptionLabel,
  authorNameLabel,
  durationLabel,
  titleLabel,
} from './../../constants';

import { pipeDuration } from '../../helpers/pipeDuration';

import { mockedAuthorsList, mockedCoursesList } from '../../data/mockedData';
import {
  createButtonStyle,
  deleteButtonStyle,
  inputStyleLarge,
  inputStyleSmall,
  inputStyleMedium,
  createAuthorButtonStyle,
  addButtonStyle,
} from '../../styles';

const CreateButton = styled(Button)`
  background-color: green;
  width: 73px;
  font-size: 14px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 5px;
`;

const InputStyle = styled(Input)`
  display: block;
  color: aliceblue;
  height: 39px;
  width: 500px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const CreateCourse = ({ toggleComponent, showCreateCourses }) => {
  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const useTextarea = true;

  const [courseData, setCourseData] = useState({
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  });

  const handleAuthorNameChange = (e) => {
    setNewAuthorName(e.target.value);
  };

  const handleCreateAuthor = () => {
    if (newAuthorName.trim() !== '') {
      const newAuthor = {
        id: uuidv4(),
        name: newAuthorName.trim(),
      };
      setNewAuthorName('');

      mockedAuthorsList.push(newAuthor);

      setAuthorsList([...mockedAuthorsList]);
    }
  };

  const handleCreateCourse = () => {
    if (
      !courseData.title ||
      courseData.title.trim() === '' ||
      durationInMinutes === 0 ||
      courseData.authors.length === 0
    ) {
      alert('Please fill all the required fields before creating the course.');
      return;
    }

    if (!courseData.description || courseData.description.trim().length < 2) {
      alert('Description should be at least 2 characters long.');
      return;
    }

    const formattedDate = getCurrentDateFormatted(); // Call the function to get the current date

    const newCourse = {
      id: uuidv4(),
      title: courseData.title,
      description: courseData.description,
      creationDate: formattedDate,
      duration: durationInMinutes,
      authors: courseData.authors.map((author) => author.id),
    };

    setCourseData({
      ...courseData,
      title: '',
      description: '',
      creationDate: '',
      duration: 0,
      authors: [],
    });

    mockedCoursesList.push(newCourse);
    toggleComponent(showCreateCourses);
  };

  const handleAddToCourse = (authorId) => {
    const selectedAuthor = authorsList.find((author) => author.id === authorId);
    if (selectedAuthor) {
      setSelectedAuthors([...selectedAuthors, selectedAuthor]);

      if (!courseData.authors.some((author) => author.id === authorId)) {
        setCourseData({
          ...courseData,
          authors: [...courseData.authors, selectedAuthor],
        });
      }

      setAuthorsList(authorsList.filter((author) => author.id !== authorId));
    }
  };

  const handleRemoveFromCourse = (authorId) => {
    const removedAuthor = selectedAuthors.find(
      (author) => author.id === authorId
    );
    if (removedAuthor) {
      setAuthorsList([...authorsList, removedAuthor]);
      setSelectedAuthors(
        selectedAuthors.filter((author) => author.id !== authorId)
      );
      setCourseData({
        ...courseData,
        authors: courseData.authors.filter((author) => author.id !== authorId),
      });
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.courses}>
        <div className={styles.title}>
          <InputStyle
            id={'Title'}
            labelText={titleLabel}
            placeholder={titlePlaceholder}
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
          />
          <CreateButton
            text={createCourseButtonText}
            style={createButtonStyle}
            onClick={handleCreateCourse}
          />
        </div>
        <div className={styles.desc_input}>
          <Input
            style={inputStyleLarge}
            useTextarea={useTextarea}
            id={'description'}
            type={'textarea'}
            labelText={descriptionLabel}
            placeholder={descriptionPlaceholder}
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.add_authors}>
        <div className={styles.add_authors_container}>
          <div className={styles.duration_container}>
            <h1>Duration</h1>
            <Input
              style={inputStyleMedium}
              id={'duration'}
              placeholder={durationPlaceholder}
              labelText={durationLabel}
              onChange={(e) => {
                const durationValue = e.target.value;

                if (!isNaN(durationValue)) {
                  const durationInMinutes = parseInt(durationValue);
                  if (durationInMinutes >= 0) {
                    setDurationInMinutes(durationInMinutes);
                  }
                }
                const durationInMinutes =
                  durationValue === '' ? 0 : parseInt(durationValue);

                if (durationInMinutes >= 0) {
                  setDurationInMinutes(durationInMinutes);
                }
              }}
              onKeyPress={(e) => {
                const isValidKey = /^[0-9\b]+$/.test(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
            />
            <h1>
              <span>Duration: </span>
              {pipeDuration(durationInMinutes)} hours
            </h1>
          </div>
          <h1>Add author</h1>
          <div className={styles.author_name}>
            <Input
              style={inputStyleMedium}
              id={'author_name'}
              placeholder={authorNamePlaceholder}
              value={newAuthorName}
              onChange={handleAuthorNameChange}
              labelText={authorNameLabel}
            />
            <Button
              style={createAuthorButtonStyle}
              text={createCourseButtonAuthorText}
              type="submit"
              onClick={handleCreateAuthor}
            />
          </div>
        </div>
        <div className={styles.authors_container}>
          <h1>Authors</h1>
          <div className={styles.authors_list}>
            {authorsList.map((author) => (
              <div className={styles.author_item} key={author.id}>
                <h3>{author.name}</h3>
                <Button
                  text={addButtonText}
                  style={addButtonStyle}
                  onClick={() => handleAddToCourse(author.id)}
                />
              </div>
            ))}
          </div>
          <h1>Course Authors</h1>

          {selectedAuthors.length === 0 ? (
            <div className={styles.author_item}>
              <h2>Authors list empty.</h2>
            </div>
          ) : (
            <div className={styles.authors_list}>
              {selectedAuthors.map((author) => (
                <div className={styles.author_item} key={author.id}>
                  <h3>{author.name}</h3>
                  <Button
                    text={deleteButtonText}
                    style={deleteButtonStyle}
                    onClick={() => handleRemoveFromCourse(author.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
