import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Validates the first half of an email address.
const validateText = (text) => {
  // NOTE: Passes RFC 5322 but not tested on google's standard.
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))$/;
  return re.test(text) || text.length === 0;
};

// 完整的邮箱信息，包括前缀和后缀
const emailAddresses = [
  { prefix: 'lizhiyuan2021', domain: 'iscas.ac.cn' },
  { prefix: 'lizhiyuan221', domain: 'gmails.com' },
  { prefix: 'lizhiyuan221', domain: 'mails.ucas.ac.cn' },
];

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
    return () => {}; // pass linter
  }, [delay]);
};

const EmailLink = ({ loopMessage }) => {
  const hold = 50; // ticks to wait after message is complete before rendering next message
  const delay = 50; // tick length in mS

  const [idx, updateIter] = useState(0); // points to current email address
  const [emailObj, setEmailObj] = useState(emailAddresses[idx]);
  const [prefix, setPrefix] = useState(emailObj.prefix);
  const [char, updateChar] = useState(0); // points to current char
  const [isActive, setIsActive] = useState(true); // disable when all messages are printed

  useInterval(
    () => {
      let newIdx = idx;
      let newChar = char;
      if (char - hold >= emailAddresses[idx].prefix.length) {
        newIdx += 1;
        newChar = 0;
      }
      if (newIdx === emailAddresses.length) {
        if (loopMessage) {
          updateIter(0);
          updateChar(0);
          setEmailObj(emailAddresses[0]);
          setPrefix('');
        } else {
          setIsActive(false);
        }
      } else {
        const newEmailObj = emailAddresses[newIdx];
        setEmailObj(newEmailObj);
        setPrefix(newEmailObj.prefix.slice(0, newChar));
        updateIter(newIdx);
        updateChar(newChar + 1);
      }
    },
    isActive ? delay : null,
  );

  return (
    <div
      className="inline-container"
      style={validateText(prefix) ? {} : { color: 'red' }}
      onMouseEnter={() => setIsActive(false)}
      onMouseLeave={() => idx < emailAddresses.length && setIsActive(true)}
    >
      <a href={validateText(prefix) ? `mailto:${emailObj.prefix}@${emailObj.domain}` : ''}>
        <span>{prefix}</span>
        <span>@{emailObj.domain}</span>
      </a>
    </div>
  );
};

EmailLink.defaultProps = {
  loopMessage: false,
};

EmailLink.propTypes = {
  loopMessage: PropTypes.bool,
};

export default EmailLink;
