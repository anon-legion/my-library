import React from 'react';
import { FaGithub } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="is-flex is-justify-content-center">
      <a href="https://github.com/anon-legion" target="_blank" rel="noopener noreferrer nofollow">
        <p className="is-clickable is-size-5 has-text-grey-dark">
          {`Copyright © 2021-${currentYear} =GV=`}
          <span className="icon-text">
            <span className="icon is-medium has-text-grey-dark">
              <FaGithub />
            </span>
          </span>
        </p>
      </a>
    </footer>
  );
}
