import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ForbiddenPage.module.css';

const randomHex = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');

const BrowserIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="5" y="9" width="38" height="30" rx="3" />
    <path d="M5 17h38" />
    <circle cx="11" cy="13" r="1" fill="currentColor" />
    <circle cx="15" cy="13" r="1" fill="currentColor" />
    <circle cx="19" cy="13" r="1" fill="currentColor" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M24 5 9 11v11c0 9.5 6.4 17.6 15 21 8.6-3.4 15-11.5 15-21V11L24 5Z" />
    <path d="m18 18 12 12M30 18 18 30" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="8" y="7" width="32" height="14" rx="2" />
    <rect x="8" y="27" width="32" height="14" rx="2" />
    <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    <circle cx="14" cy="34" r="1.5" fill="currentColor" />
    <path d="M22 14h12M22 34h12" />
  </svg>
);

const nodes = [
  { label: 'You', sub: 'Browser', status: 'Working', ok: true, Icon: BrowserIcon },
  { label: 'Firewall', sub: 'Portfolio Shield', status: 'Blocked', ok: false, Icon: ShieldIcon },
  { label: 'Host', sub: 'Origin server', status: 'Working', ok: true, Icon: ServerIcon },
];

const ForbiddenPage = () => {
  const rayId = useMemo(() => randomHex(16), []);
  const timestamp = useMemo(
    () => new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
    []
  );
  const host = typeof window !== 'undefined' ? window.location.host : 'this site';
  const [ip, setIp] = useState(null);

  const revealIp = async () => {
    setIp('…');
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
    } catch {
      setIp('unavailable');
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <p className={styles.meta}>
            <span className={styles.code}>Error 403</span>
            <span>Ray ID: {rayId}</span>
            <span>{timestamp}</span>
          </p>
          <h1 className={styles.title}>Sorry, you have been blocked</h1>
          <p className={styles.subtitle}>
            You are unable to access <span className={styles.host}>{host}</span>
          </p>
        </header>

        <section className={styles.diagram} aria-label="Connection status">
          {nodes.map(({ label, sub, status, ok, Icon }, i) => (
            <div className={styles.nodeGroup} key={label}>
              {i > 0 && (
                <div
                  className={`${styles.link} ${
                    nodes[i - 1].ok && ok ? '' : styles.linkBroken
                  }`}
                  aria-hidden="true"
                />
              )}
              <div className={styles.node}>
                <div className={`${styles.iconWrap} ${ok ? '' : styles.iconBlocked}`}>
                  <Icon />
                  <span
                    className={`${styles.badge} ${ok ? styles.badgeOk : styles.badgeErr}`}
                    aria-hidden="true"
                  >
                    {ok ? '✓' : '✕'}
                  </span>
                </div>
                <p className={styles.nodeLabel}>{label}</p>
                <p className={styles.nodeSub}>{sub}</p>
                <p className={ok ? styles.statusOk : styles.statusErr}>{status}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.terminal} aria-label="Request log">
          <div className={styles.terminalBar}>
            <span />
            <span />
            <span />
            <p>firewall.log</p>
          </div>
          <pre>
            <span className={styles.prompt}>$</span> curl -I https://{host}
            {'\n'}
            <span className={styles.errText}>HTTP/2 403 Forbidden</span>
            {'\n'}x-ray-id: {rayId}
            {'\n'}x-blocked-by: portfolio-shield
            {'\n'}x-reason: request matched a security rule
          </pre>
        </section>

        <section className={styles.info}>
          <div>
            <h2>What happened?</h2>
            <p>
              This website uses a security service to protect itself from online
              attacks. The action you just performed triggered that protection.
              Submitting a certain word or phrase, a malformed request, or an
              unusual pattern of traffic can all cause this.
            </p>
          </div>
          <div>
            <h2>What can I do?</h2>
            <p>
              Contact the site owner and let them know you were blocked. Include
              what you were doing when this page came up and the Ray ID shown at
              the bottom of this page.
            </p>
            <div className={styles.actions}>
              <Link to="/" className={styles.primary}>
                Go back home
              </Link>
              <Link to="/contact" className={styles.secondary}>
                Contact site owner
              </Link>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>
            Ray ID: <code>{rayId}</code>
          </span>
          <span className={styles.dot}>•</span>
          <span>
            Your IP:{' '}
            {ip ? (
              <code>{ip}</code>
            ) : (
              <button type="button" className={styles.reveal} onClick={revealIp}>
                Click to reveal
              </button>
            )}
          </span>
          <span className={styles.dot}>•</span>
          <span>
            Security by <Link to="/about">Manvir Singh</Link>
          </span>
        </footer>
      </main>
    </div>
  );
};

export default ForbiddenPage;
