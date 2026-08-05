import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const HomePage = lazy(() => import("./pages/HomePage.tsx"))
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.tsx"))
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"))
const TechnologyPage = lazy(() => import("./pages/TechnologyPage.tsx"))
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"))

import { Navbar } from './components/shared/Navbar.tsx'
import { BottomNav } from './components/shared/BottomNav.tsx'
import { Footer } from './components/shared/Footer.tsx'
import Loader from './components/feedback/Loader.tsx'

import { SmoothCursor } from './components/ui/smooth-cursor.tsx'



function App() {

  return (
    <BrowserRouter>
      <SmoothCursor />
      <Navbar />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technologies" element={<TechnologyPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
      <BottomNav />
      <Footer />
    </BrowserRouter>
  )
}

export default App
