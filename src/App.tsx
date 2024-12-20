import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar
        pages={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: 'Projects', href: '/projects' },
          { name: 'Blog', href: '/blog' },
          { name: 'Contact', href: '/contact' },
        ]}
        heading="Timur Inal"
      />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
