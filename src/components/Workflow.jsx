import React from 'react';
import { workflowSteps } from '../data/siteContent.js';

export default function Workflow() {
  return (
    <section className="workflow section-shell" aria-labelledby="workflow-heading">
      <h2
        className="cyber-heading"
        id="workflow-heading"
        data-text="Our workflow is completed in three simple steps"
      >
        Our workflow is completed in three simple steps
      </h2>
      <div className="workflow-grid">
        {workflowSteps.map(({ title, description, image }, index) => (
          <article className="workflow-step" key={title} style={{ '--step-index': index + 1 }}>
            <div className="workflow-visual-frame">
              <img className="workflow-visual-img" src={image} alt={title} />
              <div className="workflow-visual-overlay" aria-hidden="true" />
            </div>
            <span className="workflow-count">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
