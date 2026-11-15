import FlowDiagram from './FlowDiagram';
import styles from '../styles/ProjectCard.module.css';

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <p className={styles.sectionTitle}>{`// ${title}`}</p>
    {children}
  </div>
);

const ProjectCard = ({ project }) => {
  const hasCaseStudy = Boolean(project.problem);

  return (
    <article
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
    >
      {project.image && (
        <img
          src={project.image}
          height={300}
          width={600}
          alt={`${project.name} screenshot`}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h3>{project.name}</h3>
        <p className={styles.tagline}>{project.tagline}</p>

        {hasCaseStudy && (
          <>
            <Section title="problem">
              <p>{project.problem}</p>
            </Section>
            <Section title="architecture">
              <FlowDiagram diagram={project.diagram} label={project.name} />
              <ul className={styles.bullets}>
                {project.architecture.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Section>
            <Section title="outcome">
              <p>{project.outcome}</p>
            </Section>
          </>
        )}

        {project.note && <p className={styles.note}>{project.note}</p>}

        <div className={styles.tags}>
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.cta}>
          {project.source_code && (
            <a
              href={project.source_code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underline}
            >
              Source Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underline}
            >
              Live Demo
            </a>
          )}
          {project.private && (
            <span className={styles.private}>
              Private repo · walkthrough available on request
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
