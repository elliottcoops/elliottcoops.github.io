import './App.css';
import { Welcome } from './components/welcome/welcome';
import { Nav } from './components/nav/nav';
import { useState, useEffect, useRef } from 'react';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = container.querySelectorAll(".section");

    const handleScroll = () => {
      const scrollPos = container.scrollTop + container.clientHeight / 2;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setCurrentPage(section.dataset.title);
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Nav title={currentPage} />
      <div className="fullpage-container" ref={containerRef}>
        <section id="Home" className="section" data-title="Home">
          <Welcome />
        </section>

        <section id="Experience" className="section" data-title="Experience">
          <Experience />
        </section>

        <section id="Projects" className="section" data-title="Projects">
          <Projects />
        </section>

      </div>
    </>
  );
}

export default App;
