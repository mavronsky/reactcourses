import styles from './CourseInfo.module.css';
import { useParams, Link } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from '../../data/mockedData';
import { pipeDuration } from '../../helpers/pipeDuration';

function CourseInfo() {
  const { id } = useParams();

  // Найти курс в mockedCoursesList по id
  const course = mockedCoursesList.find((course) => course.id === id);

  // Получить список авторов курса
  const authorIds = course.authors;

  // Найти соответствующих авторов в mockedAuthorsList
  const authors = mockedAuthorsList.filter((author) =>
    authorIds.includes(author.id)
  );

  return (
    <div className={styles.infoContainer}>
      <Link to="/">
        <h3> Back to all courses</h3>{' '}
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
  );
}

export default CourseInfo;
