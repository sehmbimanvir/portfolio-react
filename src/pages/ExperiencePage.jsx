import experience from '../data/experience.json';
import styles from '../styles/ExperiencePage.module.css';

// Renders experience.json as syntax-highlighted JSON, like an open editor tab.
const Value = ({ value, indent }) => {
  const pad = '  '.repeat(indent);

  if (value === null) return <span className={styles.literal}>null</span>;
  if (typeof value === 'number')
    return <span className={styles.literal}>{value}</span>;
  if (typeof value === 'string')
    return <span className={styles.string}>"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.every((v) => typeof v !== 'object')) {
      return (
        <>
          [
          {value.map((v, i) => (
            <span key={i}>
              <Value value={v} indent={indent} />
              {i < value.length - 1 ? ', ' : ''}
            </span>
          ))}
          ]
        </>
      );
    }
    return (
      <>
        [
        {value.map((v, i) => (
          <span key={i} className={styles.block}>
            {pad}&nbsp;&nbsp;
            <Value value={v} indent={indent + 1} />
            {i < value.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className={styles.block}>{pad}]</span>
      </>
    );
  }

  const entries = Object.entries(value);
  return (
    <>
      &#123;
      {entries.map(([k, v], i) => (
        <span key={k} className={styles.block}>
          {pad}&nbsp;&nbsp;<span className={styles.key}>"{k}"</span>:{' '}
          <Value value={v} indent={indent + 1} />
          {i < entries.length - 1 ? ',' : ''}
        </span>
      ))}
      <span className={styles.block}>{pad}&#125;</span>
    </>
  );
};

const ExperiencePage = () => {
  return (
    <>
      <h3>Experience</h3>
      <pre className={styles.code}>
        <Value value={experience} indent={0} />
      </pre>
      <div className={styles.actions}>
        {experience.resume && (
          <a href={experience.resume} download className={styles.button}>
            Download Resume (PDF)
          </a>
        )}
        <a
          href="https://www.linkedin.com/in/sehmbimanvir/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.outlined}
        >
          Full history on LinkedIn
        </a>
      </div>
    </>
  );
};

export default ExperiencePage;
