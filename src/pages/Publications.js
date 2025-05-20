import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const Publications = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // 从 about.md 文件中提取 Publications 部分
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then((text) => {
          // 找到 Publications 部分并设置
          const publicationsSection = text.split('# Publications')[1];
          if (publicationsSection) {
            setMarkdown(`# Publications\n\n${publicationsSection}`);
          }
        });
    });
  }, []);

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
            <p>My academic and research publications</p>
          </div>
        </header>
        {markdown ? (
          <Markdown>{markdown}</Markdown>
        ) : (
          <p>Loading publications...</p>
        )}
      </article>
    </Main>
  );
};

export default Publications;
