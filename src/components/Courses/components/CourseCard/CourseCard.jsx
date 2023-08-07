import Button from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';
import { mockedCoursesList } from '../../../../data/mockedData';

import { showButtonStyle } from '../../../../styles';
import { showCourseButtonText } from '../../../../constants';

function CourseCard(props) {
  console.log(mockedCoursesList);
  return (
    <div className={styles.course_card}>
      <div className={styles.course_desc}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div className={styles.course_info}>
        <p>
          Authors: <span>{props.authors.join(', ')} </span>
        </p>
        <p>
          Duration: <span>{props.duration} hours</span>
        </p>
        <p>
          Created: <span>{props.creationDate}</span>
        </p>
        <Button text={showCourseButtonText} style={showButtonStyle} />
      </div>
    </div>
  );
}

export default CourseCard;
