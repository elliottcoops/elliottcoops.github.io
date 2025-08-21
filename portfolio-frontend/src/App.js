import './App.css';
import { Welcome } from './components/welcome/welcome';
import { Projects } from './components/projects/projects';
import { Experience } from './components/experience/experience'
import { Nav } from './components/nav/nav'

function App() {
  return (
    <>
    <Nav /> 

    <div className="fullpage-container">
      
      <section className="section">
        <Welcome />
      </section>

       <section className="section">
        <Projects />
      </section>

    </div>
    </>
  );
}

export default App;
