import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const Honors = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/honors.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then(setMarkdown);
    });
  }, []);

  return (
    <Main
      title="Honors & Awards"
      description="Zhiyuan Li's honors and awards"
    >
      <article className="post markdown" id="honors">
        <header>
          <div className="title">
            <h2>
              <Link to="/honors">Honors & Awards</Link>
            </h2>
            <p>A selection of honors and awards that I&apos;ve received</p>
          </div>
        </header>
        {markdown ? (
          <Markdown>{markdown}</Markdown>
        ) : (
          <p>Loading honors...</p>
        )}
      </article>
    </Main>
  );
};

export default Honors;
