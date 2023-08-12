import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

import Button from '../../common/Button/Button.tsx'
import Input from '../../common/Input/Input.tsx'

import styles from './CreateCourse.module.css'

import { getCurrentDateFormatted } from '../../helpers/dateGenerator.js'

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
} from '../../constants.js'

import { pipeDuration } from '../../helpers/pipeDuration.js'

import { mockedAuthorsList, mockedCoursesList } from '../../data/mockedData.js'
import {
  createButtonStyle,
  deleteButtonStyle,
  inputStyleLarge,
  inputStyleSmall,
  inputStyleMedium,
  createAuthorButtonStyle,
  addButtonStyle,
} from '../../styles.js'

// Define types for the author and course data
interface Author {
  id: string
  name: string
}

interface Course {
  id: string
  title: string
  description: string
  creationDate: string
  duration: number
  authors: Author[]
}

// Define props for InputStyle
interface InputStyleProps {
  labelText: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Define props for InputDescStyle
interface InputDescStyleProps {
  useTextarea: boolean
  labelText: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

// Define props for InputMediumStyle
interface InputMediumStyleProps {
  labelText: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Define props for CreateCourse component
interface CreateCourseProps {}

const CreateButton = styled(Button)`
  background-color: green;
  width: 73px;
  font-size: 14px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 5px;
`

const InputStyle = styled(Input)`
  display: block;
  color: black;
  margin-top: 10px;

  height: 39px;
  width: 500px;
  font-size: 20px;
  padding-left: 10px;
  @media (max-width: 768px) {
    width: 200px;
  }
`

const InputDescStyle = styled(Input)`
  display: flex;
  font-size: 25px;
  font-family: 'Roboto';
  justify-content: center;
  height: 130px;
  width: 1500px;
  margin-top: 10px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 327px;
    font-size: 15px;
  }
  padding-left: 10px;
`

const InputMediumStyle = styled(Input)`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 400px;
  margin-top: 10px;
  align-items: center;
  border-radius: 5px;
  padding-left: 10px;
  @media (max-width: 768px) {
    width: 200px;
    font-size: 15px;
  }
`

const CreateCourse: React.FC<CreateCourseProps> = () => {
  const navigate = useNavigate()

  const [durationInMinutes, setDurationInMinutes] = useState<number>(0)
  const [newAuthorName, setNewAuthorName] = useState<string>('')
  const [authorsList, setAuthorsList] = useState<Author[]>(mockedAuthorsList)
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([])

  const useTextarea = true

  const [courseData, setCourseData] = useState<Course>({
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  })

  const handleAuthorNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewAuthorName(e.target.value)
  }

  const handleCreateAuthor = () => {
    if (newAuthorName.trim() !== '') {
      const newAuthor = {
        id: uuidv4(),
        name: newAuthorName.trim(),
      }
      setNewAuthorName('')

      mockedAuthorsList.push(newAuthor)

      setAuthorsList([...mockedAuthorsList])
    }
  }

  const handleCourseDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourseData({ ...courseData, description: e.target.value })
  }

  const handleCreateCourse = () => {
    if (
      !courseData.title ||
      courseData.title.trim() === '' ||
      durationInMinutes === 0 ||
      courseData.authors.length === 0
    ) {
      alert('Please fill all the required fields before creating the course.')
      return
    }

    if (!courseData.description || courseData.description.trim().length < 2) {
      alert('Description should be at least 2 characters long.')
      return
    }

    const formattedDate = getCurrentDateFormatted() // Call the function to get the current date

    const newCourse = {
      id: uuidv4(),
      title: courseData.title,
      description: courseData.description,
      creationDate: formattedDate,
      duration: durationInMinutes,
      authors: courseData.authors.map((author) => author.id),
    }

    setCourseData({
      ...courseData,
      title: '',
      description: '',
      creationDate: '',
      duration: 0,
      authors: [],
    })

    mockedCoursesList.push(newCourse)
    navigate('/')
  }

  const handleAddToCourse = (authorId: string) => {
    const selectedAuthor = authorsList.find((author) => author.id === authorId)
    if (selectedAuthor) {
      setSelectedAuthors([...selectedAuthors, selectedAuthor])

      if (!courseData.authors.some((author) => author.id === authorId)) {
        setCourseData({
          ...courseData,
          authors: [...courseData.authors, selectedAuthor],
        })
      }

      setAuthorsList(authorsList.filter((author) => author.id !== authorId))
    }
  }

  //   const handleCourseDescriptionChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setCourseData({ ...courseData, description: e.target.value });
  // };

  const handleRemoveFromCourse = (authorId: string) => {
    const removedAuthor = selectedAuthors.find(
      (author) => author.id === authorId
    )
    if (removedAuthor) {
      setAuthorsList([...authorsList, removedAuthor])
      setSelectedAuthors(
        selectedAuthors.filter((author) => author.id !== authorId)
      )
      setCourseData({
        ...courseData,
        authors: courseData.authors.filter((author) => author.id !== authorId),
      })
    }
  }

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
          <InputDescStyle
            useTextarea={useTextarea}
            id={'description'}
            type={'textarea'}
            labelText={descriptionLabel}
            placeholder={descriptionPlaceholder}
            value={courseData.description}
            onChange={handleCourseDescriptionChange}
          />
        </div>
      </div>

      <div className={styles.add_authors}>
        <div className={styles.add_authors_container}>
          <div className={styles.duration_container}>
            <h1>Duration</h1>
            <InputMediumStyle
              id={'duration'}
              placeholder={durationPlaceholder}
              labelText={durationLabel}
              onChange={(e) => {
                const durationValue = e.target.value

                if (!isNaN(parseInt(durationValue))) {
                  const durationInMinutes = parseInt(durationValue)
                  if (durationInMinutes >= 0) {
                    setDurationInMinutes(durationInMinutes)
                  }
                }
                const durationInMinutes =
                  durationValue === '' ? 0 : parseInt(durationValue)

                if (durationInMinutes >= 0) {
                  setDurationInMinutes(durationInMinutes)
                }
              }}
              onKeyPress={(e) => {
                const isValidKey = /^[0-9\b]+$/.test(e.key)
                if (!isValidKey) {
                  e.preventDefault()
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
            <InputMediumStyle
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
  )
}

export default CreateCourse
