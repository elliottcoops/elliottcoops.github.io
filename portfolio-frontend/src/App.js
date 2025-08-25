import './App.css';
import { Nav } from './components/nav/nav';
import { Home } from './components/home/home'
import { Projects } from './components/projects/projects'
import { Experience } from './components/experience/experience'
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPageContent = () => {
    switch (currentPage) {
      case "Home":
        return <Home />
      case "Projects":
        return <Projects />
      case "Experience":
        return <Experience />
      default:
        return <h1>Page not found</h1>;
    }
  };

  return (
    <>
      <div className="fullpage-container">
        <Nav title={currentPage} setCurrentPage={setCurrentPage} />
        {renderPageContent()}
      </div>
    </>
  );
}

export default App;
