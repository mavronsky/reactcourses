import React, { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Button from '../../common/Button/Button.tsx'
import Input from '../../common/Input/Input.tsx'

import styles from './CreateCourse.module.css'

import { getCurrentDateFormatted } from '../../helpers/dateGenerator.js'

import { STRINGS } from '../../constants.js'

import { pipeDuration } from '../../helpers/pipeDuration.js'

import { mockedAuthorsList, mockedCoursesList } from '../../data/mockedData.js'

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

const CreateCourse: React.FC = () => {
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

      setAuthorsList([...authorsList, newAuthor])
    }
  }

  const handleCourseDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const formattedDate = getCurrentDateFormatted()
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

    setAuthorsList([])
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
          <Input
            className={styles.inputSmallStyle}
            id={'Title'}
            labelText={STRINGS.titleLabel}
            placeholder={STRINGS.titlePlaceholder}
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
          />
          <Button
            className={styles.createButtonStyle}
            text={STRINGS.createCourseButtonText}
            onClick={handleCreateCourse}
          />
        </div>
        <div className={styles.desc_input}>
          <Input
            className={styles.inputDescStyle}
            useTextarea={useTextarea}
            id={'description'}
            type={'textarea'}
            labelText={STRINGS.descriptionLabel}
            placeholder={STRINGS.descriptionPlaceholder}
            value={courseData.description}
            onChange={handleCourseDescriptionChange}
          />
        </div>
      </div>

      <div className={styles.add_authors}>
        <div className={styles.add_authors_container}>
          <div className={styles.duration_container}>
            <h1>Duration</h1>
            <Input
              className={styles.inputMediumStyle}
              id={'duration'}
              placeholder={STRINGS.durationPlaceholder}
              labelText={STRINGS.durationLabel}
              onChange={(e) => {
                const durationValue = e.target.value

                if (!isNaN(parseInt(durationValue))) {
                  const durationInMinutes = parseInt(durationValue)
                  if (durationInMinutes >= 0) {
                    setDurationInMinutes(durationInMinutes)
                  }
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
            <Input
              className={styles.inputMediumStyle}
              id={'author_name'}
              placeholder={STRINGS.authorNamePlaceholder}
              value={newAuthorName}
              onChange={handleAuthorNameChange}
              labelText={STRINGS.authorNameLabel}
            />
            <Button
              className={styles.createAuthorButtonStyle}
              text={STRINGS.createCourseButtonAuthorText}
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
                  text={STRINGS.addButtonText}
                  className={styles.addButtonStyle}
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
                    text={STRINGS.deleteButtonText}
                    className={styles.deleteButtonStyle}
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
