import styles from '../styles/AboutPage.module.css';

const skills = [
  { group: 'frontend', items: ['React', 'Vue', 'JavaScript', 'HTML/CSS', 'Swift (iOS)'] },
  { group: 'backend', items: ['Node.js', 'GraphQL', 'FastAPI', 'Laravel', 'REST APIs'] },
  { group: 'data', items: ['Postgres', 'Data pipelines', 'Grafana'] },
  { group: 'ai', items: ['MCP servers', 'LLM tool use', 'RAG (in progress)'] },
  { group: 'infra', items: ['Docker', 'Cloudflare (Workers, R2, D1, Tunnel)', 'Caddy', 'Tailscale'] },
  { group: 'automation', items: ['n8n', 'Webhooks', 'Scripting'] },
];

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h3>A Little Bit About Me</h3>
      <p>
        I'm a full-stack developer with about ten years of experience building
        web applications, with React and Node.js at the core. I've also shipped
        Vue front ends and Laravel back ends. I've been based in Abu Dhabi, UAE,
        for the last four years.
      </p>
      <p>
        Today I work on a Technical Authority team that reviews and technically
        approves releases before they ship. The job is mostly reading other
        people's systems closely: architecture, risk, and what happens when
        things go wrong.
      </p>
      <p>
        Outside work I run a homelab, and that's where I'm moving into applied
        AI. I've built a pipeline that collects my own wearable data into
        Postgres, automates it with n8n, and gives LLMs access to it through
        read-only MCP servers. A RAG layer over that data comes next. I'm looking
        for AI and applied-AI roles in the UAE.
      </p>

      <h3 className={styles.skillsHeading}>Skills</h3>
      <div className={styles.code}>
        <p className={styles.line}>
          <span className={styles.keyword}>const</span> skills = &#123;
        </p>
        {skills.map(({ group, items }) => (
          <p className={styles.line} key={group}>
            &nbsp;&nbsp;{group}: [
            {items.map((item, i) => (
              <span key={item}>
                <span className={styles.string}>'{item}'</span>
                {i < items.length - 1 ? ', ' : ''}
              </span>
            ))}
            ],
          </p>
        ))}
        <p className={styles.line}>&#125;;</p>
      </div>
    </div>
  );
};

export default AboutPage;
