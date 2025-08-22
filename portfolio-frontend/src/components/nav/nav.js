import './nav.css';

export function Nav({ title }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <h1 className="logo">
          Elliott's Portfolio <span className="divider">|</span> <span className="page-title">{title}</span>
        </h1>


      </div>
      <div className="nav-right">
        <a href="#Home">Home</a>
        <a href="#Experience">Experience</a>
        <a href="#Projects">Projects</a>
      </div>
    </nav>
  );
}
