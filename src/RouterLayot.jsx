import Header from './components/Header/Header'
import Courses from './components/Courses/Courses'
import CreateCourse from './components/CreateCourse/CreateCourse'

import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'

export default function RouterLayot() {
  const MainLayot = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Courses />
        <CreateCourse />
      </>
    )
  }

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    )
  }

  return <BrowserRouters />
}
