import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import { pubLinkMarkdownOptions } from '../components/Markdown/pubLinkOverrides';
import Main from '../layouts/Main';

const Publications = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then((text) => {
          const pre = text.match(/# Preprint\s*\n([\s\S]*?)(?=\n# [^#]|$)/);
          const journal = text.match(/# Journal\s*\n([\s\S]*?)(?=\n# [^#]|$)/);
          const pub = text.match(/# Publications\s*\n([\s\S]*?)(?=\n# [^#]|$)/);
          const parts = [];
          if (pre) parts.push(`# Preprint\n\n${pre[1].trim()}`);
          if (journal) parts.push(`# Journal\n\n${journal[1].trim()}`);
          if (pub) parts.push(`# Conference\n\n${pub[1].trim()}`);
          if (parts.length) {
            setMarkdown(parts.join('\n\n'));
          }
        });
    });
  }, []);

  const markdownOptions = useMemo(() => pubLinkMarkdownOptions, []);

  return (
    <Main
      title="Publications"
      description="Zhiyuan Li's research publications"
    >
      <article className="post markdown" id="publications">
        <header>
          <div className="title">
            <h2>
              <Link to="/publications">Publications</Link>
            </h2>
            <p>Preprints and peer-reviewed papers</p>
          </div>
        </header>
        {markdown ? (
          <Markdown options={markdownOptions}>{markdown}</Markdown>
        ) : (
          <p>Loading publications...</p>
        )}
      </article>
    </Main>
  );
};

export default Publications;
