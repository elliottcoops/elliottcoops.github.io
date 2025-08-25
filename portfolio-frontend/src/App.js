import './App.css';
import { Nav } from './components/nav/nav';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';
import { Experience } from './components/experience/experience';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  // refs for each section
  const homeRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  const sections = [
    { name: "Home", ref: homeRef },
    { name: "Experience", ref: experienceRef },
    { name: "Projects", ref: projectsRef },
  ];

  const scrollToSection = (page) => {
    const section = sections.find(s => s.name === page);
    if (section && section.ref.current) {
      section.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Optional: update current page on manual scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const s of sections) {
        if (s.ref.current) {
          const top = s.ref.current.offsetTop;
          const height = s.ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentPage(s.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fullpage-container">
      <Nav title={currentPage} setCurrentPage={scrollToSection} />
      <div ref={homeRef} className="fullpage-section"><Home /></div>
      <div ref={experienceRef} className="fullpage-section"><Experience /></div>
      <div ref={projectsRef} className="fullpage-section"><Projects /></div>
    </div>
  );
}

export default App;
