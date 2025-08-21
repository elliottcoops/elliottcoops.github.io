import './projects.css';

export function Projects() {
  const experiences = [
    {
      role: "Software Engineer Intern",
      company: "NatWest Group",
      period: "Summer 2025",
      description:
        "Designed Oracle FCL architecture diagram supporting 97% of group spend and built full-stack LLM QA internal tool",
    },
    {
      role: "Machine Learning Research Intern",
      company: "Robotica Machine Learning",
      period: "Summers 2022 & 2023",
      description:
        "Curated datasets for lip-sync training (2022) and enhanced sign language avatar realism with GANs (2023)",
    },
    {
      role: "Software Engineer Intern",
      company: "Allies Computing",
      period: "Summer 2021",
      description:
        "Integrated the company’s API product into Amazon Alexa for use by their 9,000 customers; press release",
    },
  ];

  return (
    <div className="timeline-horizontal">
      {experiences.map((exp, index) => (
        <div className="timeline-point" key={index}>
          <div className="timeline-label">
            <h3>{exp.role}</h3>
            <span>{exp.company} | {exp.period}</span>
            <p>{exp.description}</p>
          </div>
          <div className="timeline-dot" />
        </div>
      ))}
      <div className="timeline-line" />
    </div>
  );
}
