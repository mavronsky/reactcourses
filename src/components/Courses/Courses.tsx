import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData'
import CourseCard from './components/CourseCard/CourseCard'
import Button from '../../common/Button/Button'
import SearchBar from './components/SearchBar/SearchBar'
import styles from './Courses.module.css'
import { pipeDuration } from '../../helpers/pipeDuration'
import { STRINGS } from '../../constants'

interface Course {
  id: string
  title: string
  description: string
  duration: number
  creationDate: string
  authors: string[]
}

interface Author {
  id: string
  name: string
}

const Courses: React.FC = () => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchSubmit = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery)
  }

  const authorsMap = useMemo(() => getAuthorsMap(), [])

  const filteredCourses = useMemo(() => {
    if (searchQuery === '') {
      return mockedCoursesList
    }
    const lowerCaseSearch = searchQuery.toLowerCase()
    return mockedCoursesList.filter(
      (course: Course) =>
        course.title.toLowerCase().includes(lowerCaseSearch) ||
        course.id.includes(lowerCaseSearch)
    )
  }, [searchQuery])

  const handleToAddCourse = () => {
    navigate('/courses/add')
  }

  return (
    <div className={styles.courses}>
      <div className={styles.searchBar}>
        <SearchBar value={searchQuery} onSubmit={handleSearchSubmit} />
        <Button
          className={styles.createButtonStyle}
          text={STRINGS.createAddNewCourseButtonText}
          onClick={handleToAddCourse}
        />
      </div>

      {searchQuery === '' ? (
        mockedCoursesList.map(
          ({
            id,
            title,
            description,
            duration,
            creationDate,
            authors,
          }: Course) => (
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
        <div className={styles.noMatches}>No matches.</div>
      ) : (
        filteredCourses.map(
          ({
            id,
            title,
            description,
            duration,
            creationDate,
            authors,
          }: Course) => (
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
  )
}

export default Courses

function getAuthorsMap(): Record<string, string> {
  return mockedAuthorsList.reduce((acc, author: Author) => {
    acc[author.id] = author.name
    return acc
  }, {} as Record<string, string>)
}
