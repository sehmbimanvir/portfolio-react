import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects.json';
import styles from '../styles/ProjectsPage.module.css';

const ProjectsPage = () => {
  return (
    <>
      <h3>Stuff I've Built So Far</h3>
      <p className={styles.intro}>
        Mostly self-hosted systems built on my own health and training data:
        ingestion, storage, automation, and secure access for LLMs. Screenshots
        and diagrams use mock or redacted data.
      </p>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
