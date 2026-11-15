import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'sehmbimanvir';
const PROFILE_URL = `https://github.com/${USERNAME}`;

// Shown before the API responds and whenever it fails (rate limits,
// blockers), so the page never falls back to "0 repos / 0 followers".
// Order also decides which repos are "pinned" at the top.
const PINNED = [
  {
    name: 'truecaller-cli',
    description: 'Truecaller CLI utility for mobile number search.',
  },
  {
    name: 'telegram-bot-vehicle-details',
    description: 'A Telegram bot to find vehicle details.',
    homepage: 'https://t.me/vehicle_details_bot',
  },
  {
    name: 'laravel-image-upload',
    description: 'Laravel image upload to S3.',
  },
  {
    name: 'laravel-vue-boilerplate',
    description: 'Laravel + Vue boilerplate.',
  },
  {
    name: 'express-js-api-boilerplate',
    description: 'Express.js API boilerplate.',
  },
].map((repo) => ({
  ...repo,
  id: repo.name,
  html_url: `${PROFILE_URL}/${repo.name}`,
}));

const pinnedRank = (name) => {
  const i = PINNED.findIndex((p) => p.name === name);
  return i === -1 ? Infinity : i;
};

const GithubPage = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(PINNED);
  const [failed, setFailed] = useState(false);

  const theme = {
    dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGithubData() {
      // No auth header on purpose: anything in a VITE_ env var ships in the
      // public bundle, and an expired token turns every request into a 401.
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`,
            { signal: controller.signal }
          ),
        ]);

        if (!userRes.ok || !repoRes.ok) throw new Error('GitHub API error');

        const [userData, repoData] = await Promise.all([
          userRes.json(),
          repoRes.json(),
        ]);
        setUser(userData);

        if (Array.isArray(repoData)) {
          const sorted = repoData
            .filter((r) => !r.fork && !r.archived && r.name !== USERNAME)
            .sort(
              (a, b) =>
                pinnedRank(a.name) - pinnedRank(b.name) ||
                (b.stargazers_count || 0) - (a.stargazers_count || 0)
            )
            .slice(0, 6);
          if (sorted.length) setRepos(sorted);
        }
      } catch (err) {
        if (err.name !== 'AbortError') setFailed(true);
      }
    }

    fetchGithubData();
    return () => controller.abort();
  }, []);

  const stat = (value) => (user ? value : '—');

  return (
    <>
      <div className={styles.user}>
        <div>
          <img
            src={
              user?.avatar_url ||
              'https://avatars.githubusercontent.com/u/43912626?v=4'
            }
            className={styles.avatar}
            alt={USERNAME}
            width={50}
            height={50}
          />
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.username}
          >
            <h3>{USERNAME}</h3>
          </a>
        </div>
        <div>
          <h3>{stat(user?.public_repos)} repos</h3>
        </div>
        <div>
          <h3>{stat(user?.followers)} followers</h3>
        </div>
      </div>
      {failed && (
        <p className={styles.notice}>
          Couldn't reach the GitHub API just now, so these are my pinned repos.{' '}
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
            See everything on GitHub
          </a>
          .
        </p>
      )}
      <div className={styles.container}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={USERNAME}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export default GithubPage;
