import React from 'react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SocMediaIcons() {
  return (
    <ul className="soc-media-icons-ul">
      <li>
        <a href="http://localhost:3000">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </li>
      <li>
        <a href="http://localhost:3000">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </li>
      <li>
        <a href="http://localhost:3000">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
      <li>
        <a href="http://localhost:3000">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </li>
    </ul>
  );
}

export default SocMediaIcons;
