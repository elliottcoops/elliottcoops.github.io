import React from "react";
import './experience.css';

export function Experience() {
  return (
    <div class="container py-5">
      <div class="main-timeline">
        <div class="timeline left">
          <div class="card">
            <div class="card-body p-4">
              <h3>2021 - Allies Computing</h3>
              <p class="mb-0">Integrated the company’s API product into Amazon Alexa for use by their 9,000 customers.</p>
                 <a href='https://alliescomputing.com/news/student-plugs-postcoder-into-alexa'> Press release. </a>
            </div>
          </div>
        </div>
        <div class="timeline right">
          <div class="card">
            <div class="card-body p-4">
              <h3>2022/3 - Robotica Machine Learning</h3>
              <p class="mb-0">Curated datasets for lip-sync training (2022) and enhanced sign language avatar realism with GANs (2023).</p>
            </div>
          </div>
        </div>

        <div class="timeline left">
          <div class="card">
            <div class="card-body p-4">
              <h3>2025 - NatWest Group</h3>
              <p class="mb-0">Designed Oracle FCL architecture diagram supporting 97% of group spend and built full-stack LLM QA internal tool.</p>
            </div>
          </div>
        </div>
        
        
        
      </div>
    </div>
  );
}