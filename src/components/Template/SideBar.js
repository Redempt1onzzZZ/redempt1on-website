import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Zhiyuan Li</h2>
        <p>
          <a href="mailto:lizhiyuan2021@iscas.ac.cn">lizhiyuan2021@iscas.ac.cn</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Zhiyuan Li. I am currently a PhD candidate at Institute of Software,
        Chinese Academy of Science{' '}
        <a href="http://www.iscas.ac.cn/">(ISCAS)</a>, working with Prof.{' '}
        <a href="https://people.ucas.ac.cn/~jingzheng">Jingzheng Wu</a> and Associate Prof.{' '}
        <a href="https://ryderling.github.io/">Xiang Ling</a>.
        I am interested in <span className="highlight-dark">AI system security</span>. Besides,
        I am also exploring
        <span className="highlight-dark">
          how to use insights from software to improve the robustness of hardware.
        </span>
      </p>
      <ul className="actions">
        <li>
          <Link to="/about" className="button">
            Learn More
          </Link>
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Zhiyuan Li <Link to="/">zanelee.site</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
