import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import PathTracing from './pages/projects/PathTracing';

import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);

  return (
    <>
      <Navbar
        pages={[
          { name: 'About', href: '/about' },
          { name: 'Projects', href: '/projects' },
          { name: 'Blog', href: '/blog' },
          { name: 'Contact', href: '/contact' },
        ]}
        heading="Timur Inal"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/projects/path-tracing" element={<PathTracing />} />
      </Routes>
    </>
  );
}

export default App;
