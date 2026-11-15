import styles from '../styles/FlowDiagram.module.css';

// Left-to-right architecture flow: stages connected by arrows.
// Stacks vertically on narrow screens (arrows rotate to point down).
const FlowDiagram = ({ diagram, label }) => {
  if (!diagram?.stages?.length) return null;

  return (
    <figure className={styles.figure} aria-label={`${label} architecture`}>
      <div className={styles.flow}>
        {diagram.stages.map((stage, i) => (
          <div className={styles.group} key={stage.title}>
            {i > 0 && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
            <div className={styles.stage}>
              <p className={styles.stageTitle}>{stage.title}</p>
              <ul>
                {stage.nodes.map((node) => (
                  <li key={node} className={styles.node}>
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {diagram.footer && (
        <figcaption className={styles.footer}>{diagram.footer}</figcaption>
      )}
    </figure>
  );
};

export default FlowDiagram;
