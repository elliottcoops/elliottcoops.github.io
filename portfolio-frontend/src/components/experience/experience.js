import React from 'react';
import './experience.css';

export function Experience() {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "NatWest Group",
      dates: "Summer 2025",
      description: "Designed Oracle FCL architecture diagram supporting 97% of group spend and built full-stack LLM QA internal tool."
    },
    {
      title: "Machine Learning Research Intern",
      company: "Robotica Machine Learning",
      dates: "Summers 2022 & 2023",
      description: "Curated datasets for lip-sync training (2022) and enhanced sign language avatar realism with GANs (2023)."
    },
    {
      title: "Software Engineer Intern",
      company: "Allies Computing",
      dates: "Summer 2021",
      description: "Integrated the company’s API product into Amazon Alexa for use by their 9,000 customers; press release."
    },
  ];

  return (
    <div className="experience-wrapper">
  <div className="experience-line"></div>
  {experiences.map((exp, i) => (
    <div key={exp.title} className={`experience-entry ${i % 2 === 0 ? 'left' : 'right'}`}>
      <div className="experience-text">
        <h3>{exp.title}</h3>
        <span>{exp.company} | {exp.dates}</span>
        <p>{exp.description}</p>
      </div>
    </div>
  ))}
</div>

  );
}
