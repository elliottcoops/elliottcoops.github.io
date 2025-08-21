import './nav.css';

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <h1 className="logo">Elliott's Portfolio</h1>
      </div>
      <div className="nav-right">
        <a href="#home">Home</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
      </div>
    </nav>
  );
}
