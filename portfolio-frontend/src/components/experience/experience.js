import React from "react";
import './experience.css';

export function Experience() {
  const events = [
    {
      year: "2025",
      company: "NatWest Group",
      description: "Designed Oracle FCL architecture diagram supporting 97% of group spend and built full-stack LLM QA internal tool."
    },
    {
      year: "2022/3",
      company: "Robotica Machine Learning",
      description: "Curated datasets for lip-sync training (2022) and enhanced sign language avatar realism with GANs (2023)."
    },
    {
      year: "2021",
      company: "Allies Computing",
      description: "Integrated the company’s API product into Amazon Alexa for use by their 9,000 customers.",
      link: "https://alliescomputing.com/news/student-plugs-postcoder-into-alexa"
    },
  ];

  return (
    <div className="container py-5">
      <div className="main-timeline">
        {/* Vertical line */}
        <div className="timeline-line"></div>

        {events.map((event, index) => (
          <div
            key={index}
            className={`timeline ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="card">
              <div className="card-body p-4">
                <h3>{event.year} - {event.company}</h3>
                <p>{event.description}</p>
                {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer">Press release</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
