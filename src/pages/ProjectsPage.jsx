import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects.json';
import styles from '../styles/ProjectsPage.module.css';

const ProjectsPage = () => {
  return (
    <>
      <h3>Stuff I've Built So Far</h3>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
