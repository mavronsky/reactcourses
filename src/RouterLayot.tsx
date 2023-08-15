import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Courses from './components/Courses/Courses'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import CourseInfo from './components/CourseInfo/CourseInfo'
import CreateCourse from './components/CreateCourse/CreateCourse'

import MainLayout from './MainLayout'

export default function RouterLayout(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Courses />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<CreateCourse />} />
          <Route path="/courseinfo/:id" element={<CourseInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
