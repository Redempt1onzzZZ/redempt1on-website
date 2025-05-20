import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description="Zhiyuan Li's personal website."
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Welcome to my site</Link>
          </h2>
          <p>
            I&apos;m sure we&apos;re taller in another dimension.
            <span style={{ display: 'block', textAlign: 'right' }}>--Frank Ocean</span>
          </p>
        </div>
      </header>
      <p>
        {' '}
        Welcome to my personal website. Please feel free to read more{' '}
        <Link to="/about">about me</Link>, or you can check out my {' '}
        <Link to="/publications">publications</Link>,
        <Link to="/honors"> honors and awards</Link>, or{' '}
        <Link to="/contact">contact</Link> me.
      </p>
      <p>
        {' '}
        Thanks to <a href="https://github.com/mldangelo/personal-site">Michael D&apos;Angelo </a>
        for the template. My source code is available{' '}
        <a href="https://github.com/Redempt1onzzZZ/redempt1on-website">here</a>.
      </p>
    </article>
  </Main>
);

export default Index;
