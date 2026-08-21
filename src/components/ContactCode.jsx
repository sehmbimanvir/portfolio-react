import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'manvir.dev',
    href: 'https://manvir.dev',
  },
  {
    social: 'email',
    link: 'info@manvir.dev',
    href: 'mailto:info@manvir.dev',
  },
  {
    social: 'github',
    link: 'sehmbimanvir',
    href: 'https://github.com/sehmbimanvir',
  },
  {
    social: 'linkedin',
    link: 'sehmbimanvir',
    href: 'https://www.linkedin.com/in/sehmbimanvir/',
  },
  {
    social: 'twitter',
    link: 'sehmbimanvir',
    href: 'https://www.twitter.com/sehmbimanvir',
  },
  {
    social: 'instagram',
    link: 'manvir.io',
    href: 'https://www.instagram.com/manvir.io',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
