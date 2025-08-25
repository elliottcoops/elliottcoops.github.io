import { CodeCard } from './codecard';
import './home.css';

export function Home() {
  return (
    <div className="home-wrapper">
      <div className='home-container'>
        <div className='container'>
          <p>Hello, I'm</p>
          <h1 class='display-4'>Elliott Cooper</h1>
          <h2 className="display-6 fs-3 mt-2 mb-3">
            Final Year MSci Computer Science Student
          </h2>
          <p>
            Skilled in machine learning and software engineering, with industry experience in API integration, computer vision, full-stack development and financial systems.
          </p>
        </div>

        <div className='container'>
          <CodeCard />
        </div>
      </div>
    </div>
  );
}
