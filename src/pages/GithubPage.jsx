import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GithubPage = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'sehmbimanvir';

  const [user, setUser] = useState({
    login: username,
    avatar_url: 'https://avatars.githubusercontent.com/u/43912626?v=4',
    public_repos: 0,
    followers: 0,
  });
  const [repos, setRepos] = useState([]);

  const theme = {
    dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  };

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const headers = {};
        if (import.meta.env.VITE_GITHUB_TOKEN) {
          headers.Authorization = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
        }

        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
            headers,
          }),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }

        if (repoRes.ok) {
          const repoData = await repoRes.json();
          if (Array.isArray(repoData)) {
            const sorted = repoData
              .sort(
                (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
              )
              .slice(0, 6);
            setRepos(sorted);
          }
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
      }
    }

    fetchGithubData();
  }, [username]);

  return (
    <>
      <div className={styles.user}>
        <div>
          <img
            src={user.avatar_url}
            className={styles.avatar}
            alt={user.login}
            width={50}
            height={50}
          />
          <h3 className={styles.username}>{user.login}</h3>
        </div>
        <div>
          <h3>{user.public_repos} repos</h3>
        </div>
        <div>
          <h3>{user.followers} followers</h3>
        </div>
      </div>
      <div className={styles.container}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={username}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export default GithubPage;
