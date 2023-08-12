import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Course, Author } from '../../data/types'
import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData'
import { pipeDuration } from '../../helpers/pipeDuration'
import styles from './CourseInfo.module.css'

function CourseInfo() {
  const { id } = useParams<{ id: string }>()

  const course: Course | undefined = mockedCoursesList.find(
    (course) => course.id === id
  )

  if (!course) {
    return <div>No course found.</div>
  }

  const authorIds: string[] = course.authors

  const authors: Author[] = mockedAuthorsList.filter((author) =>
    authorIds.includes(author.id)
  )

  return (
    <div className={styles.infoContainer}>
      <Link to="/">
        <h3> Back to all courses</h3>
      </Link>

      <div className={styles.titleInfo}>
        <h1>{course.title}</h1>
      </div>
      <div className={styles.courseInfo}>
        <div className={styles.descInfo}>
          <p>{course.description}</p>
        </div>
        <div className={styles.detailInfo}>
          <p>Course ID: {course.id}</p>
          <p>Duration: {pipeDuration(course.duration)} hours</p>
          <p>Created: {course.creationDate}</p>
          <p>
            Authors:{' '}
            <span>{authors.map((author) => author.name).join(', ')}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseInfo
