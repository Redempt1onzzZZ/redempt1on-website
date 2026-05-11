import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons/faFilePdf';
import { faFileArchive } from '@fortawesome/free-regular-svg-icons/faFileArchive';

function textFromChildren(children) {
  if (children == null) return '';
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join('');
  }
  if (typeof children === 'number') {
    return String(children);
  }
  return String(children);
}

function joinClass(...parts) {
  const s = parts.filter(Boolean).join(' ');
  return s || undefined;
}

/** markdown-to-jsx: render [Paper] / [Artifact] links as icons */
export const MarkdownPubAnchor = ({
  href,
  children,
  className,
  style,
  ...rest
}) => {
  const label = textFromChildren(children).trim();

  if (label === '[Paper]') {
    return (
      <a
        {...rest}
        href={href}
        className={joinClass('pub-icon-link', 'pub-icon-link-paper', className)}
        title="Paper"
        aria-label="Paper"
        style={style}
      >
        <FontAwesomeIcon icon={faFilePdf} />
      </a>
    );
  }

  if (label === '[Artifact]') {
    return (
      <a
        {...rest}
        href={href}
        className={joinClass('pub-icon-link', 'pub-icon-link-artifact', className)}
        title="Artifact"
        aria-label="Artifact"
        style={{ ...style, marginInlineStart: '0.3em' }}
      >
        <FontAwesomeIcon icon={faFileArchive} />
      </a>
    );
  }

  return (
    <a href={href} className={className} style={style} {...rest}>
      {children}
    </a>
  );
};

MarkdownPubAnchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types -- style from markdown-to-jsx
  style: PropTypes.object,
};

MarkdownPubAnchor.defaultProps = {
  href: undefined,
  children: null,
  className: undefined,
  style: undefined,
};

export const pubLinkMarkdownOptions = {
  overrides: {
    a: MarkdownPubAnchor,
  },
};
