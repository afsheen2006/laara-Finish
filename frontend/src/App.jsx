import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all pages
import Home from './pages/page.jsx';
import About from './pages/about/page.jsx';
import Admin from './pages/admin/page.jsx';
import Careers from './pages/careers/page.jsx';
import Contact from './pages/contact/page.jsx';
import DroneRD from './pages/drone-rd/page.jsx';
import DroneShowcase from './pages/drone-showcase/page.jsx';
import Edutech from './pages/edutech/page.jsx';
import EdutechCourses from './pages/edutech/courses/page.jsx';
import EdutechCourseDetail from './pages/edutech/course/[id]/page.jsx';
import Events from './pages/events/page.jsx';
import EventDetail from './pages/events/[id]/page.jsx';
import Help from './pages/help/page.jsx';
import Login from './pages/login/page.jsx';
import Portfolio from './pages/portfolio/page.jsx';
import Privacy from './pages/privacy/page.jsx';
import Services from './pages/services/page.jsx';
import Settings from './pages/settings/page.jsx';
import Signup from './pages/signup/page.jsx';
import Software from './pages/software/page.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/drone-rd" element={<DroneRD />} />
        <Route path="/drone-showcase" element={<DroneShowcase />} />
        <Route path="/edutech" element={<Edutech />} />
        <Route path="/edutech/courses" element={<EdutechCourses />} />
        <Route path="/edutech/course/:id" element={<EdutechCourseDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/software" element={<Software />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
