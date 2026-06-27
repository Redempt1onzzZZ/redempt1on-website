import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import { pubLinkMarkdownOptions } from '../components/Markdown/pubLinkOverrides';
import Main from '../layouts/Main';

/** Omit # Preprint, # Journal, and # Publications on About; Selected Publications is kept. */
function stripFullPublicationsSection(text) {
  return text
    .replace(/\n# Preprint\n[\s\S]*?(?=\n# [^#]|$)/, '')
    .replace(/\n# Journal\n[\s\S]*?(?=\n# [^#]|$)/, '')
    .replace(/\n# Publications\n[\s\S]*?(?=\n# [^#]|$)/, '');
}

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then(setMarkdown);
    });
  }, []);

  const displayMarkdown = stripFullPublicationsSection(markdown);

  const count = displayMarkdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="About" description="Learn about Zhiyuan Li">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>
              <Link to="/about">About Me</Link>
            </h2>
            <p>(in about {count} words)</p>
          </div>
        </header>
        <Markdown options={pubLinkMarkdownOptions}>{displayMarkdown}</Markdown>
      </article>
    </Main>
  );
};

export default About;
