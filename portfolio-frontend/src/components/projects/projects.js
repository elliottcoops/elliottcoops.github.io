import React from 'react';
import './projects.css';

export function Projects() {
  const projects = [
    {
      name: 'Stable-Diffusion-Cartoon-Faces',
      description: 'This repository contains a Stable Diffusion model trained on Skiittoo’s cartoon-faces dataset (from Hugging Face) to generate synthetic cartoon face images from text prompts.',
      image: '/cartoon.png', // optional top image
      link: 'https://github.com/elliottcoops/Stable-Diffusion-Cartoon-Faces'
    },
    {
      name: 'Linux-Process-Monitor',
      description: 'This repository contains a process monitor written in C for Linux. For each process, it tracks relevant statistics including CPU utilisation, process priority, state, and VRAM usage.',
      image: '/linux.png', // optional top image
      link: 'https://github.com/elliottcoops/Linux-Process-Monitor'
    },
    {
      name: 'Number-Plate-Recognition',
      description: 'This repository contains a custom YOLO model trained from scratch for number plate detection. Using EasyOCR for character recognition, enabling automatic reading of vehicle number plates from videos.',
      image: '/car.png', // optional top image
      link: 'https://github.com/elliottcoops/Number-Plate-Recognition'
    },

  ];

  return (
    <>
    <div className="projects-container">
      {projects.map(project => (
        <div key={project.name} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.image && <img src={project.image} alt={project.name} className="project-image" />}
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
        </div>
      ))}
    </div>

    <table align="center">
      <tr>
        <td>
          <h3>📝 Most Used Languages</h3>
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=elliottcoops&layout=compact&theme=github_dark" alt="Top Languages" height="180" />
        </td>
      </tr>
    </table>
    </>

  );
}
