const AboutPage = () => {
  return (
    <>
      <h3>A Little Bit About Me</h3>
      <p>Full Stack developer with React, Vue as Front End and NodeJs, Laravel as Backend. I like to create scripts, tweaks to make things easier.</p>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
