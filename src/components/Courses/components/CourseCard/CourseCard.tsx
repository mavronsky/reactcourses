import { useNavigate } from 'react-router-dom'
import React from 'react'

import Button from '../../../../common/Button/Button.tsx'
import styles from './CourseCard.module.css'

import { showButtonStyle } from '../../../../styles.js'
import { STRINGS } from '../../../../constants.js'

interface CourseCardProps {
  id: string
  title: string
  description: string
  authors: string[]
  duration: string
  creationDate: string
}

function CourseCard(props: CourseCardProps) {
  const navigate = useNavigate()

  const navigateToInfo = () => {
    navigate(`courseinfo/${props.id}`)
  }

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
        <Button
          text={STRINGS.showCourseButtonText}
          onClick={navigateToInfo}
          style={showButtonStyle}
        />
      </div>
    </div>
  )
}

export default CourseCard
