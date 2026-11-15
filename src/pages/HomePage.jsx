import { Link } from 'react-router-dom';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1>I BUILD</h1>
        <h1>AI SYSTEMS</h1>
      </div>
      <div className={styles.foreground}>
        <div className={styles.content}>
          <h1 className={styles.name}>Manvir Singh</h1>
          <h6 className={styles.bio}>Full Stack Developer → AI Engineer</h6>
          <Link to="/projects">
            <button className={styles.button}>View Work</button>
          </Link>
          <Link to="/contact">
            <button className={styles.outlined}>Contact Me</button>
          </Link>
        </div>
        <Illustration className={styles.illustration} />
      </div>
    </div>
  );
}
