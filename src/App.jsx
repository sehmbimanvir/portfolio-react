import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import CustomHead from './components/Head';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';
import GithubPage from './pages/GithubPage';
import SettingsPage from './pages/SettingsPage';
import ForbiddenPage from './pages/ForbiddenPage';

const standaloneRoutes = ['/403', '/forbidden'];

const titles = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
  '/experience': 'Experience',
  '/github': 'GitHub',
  '/settings': 'Settings',
  '/403': 'Access Denied',
  '/forbidden': 'Access Denied',
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const currentTitle = titles[location.pathname] || 'Portfolio';

  if (standaloneRoutes.includes(location.pathname)) {
    return (
      <>
        <CustomHead title={`Manvir Singh | ${currentTitle}`} />
        <ForbiddenPage />
      </>
    );
  }

  return (
    <Layout>
      <CustomHead title={`Manvir Singh | ${currentTitle}`} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/github" element={<GithubPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
