import React from 'react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SocMediaIconProps {
  icon: any;
}

function SocMediaIcon({
  icon,
}: SocMediaIconProps) {
  return (
    <li>
      <a className="soc-media-icon" href="http://localhost:3000">
        <FontAwesomeIcon icon={icon} />
      </a>
    </li>
  );
}

function SocMediaIcons() {
  return (
    <ul className="soc-media-icons">
      <SocMediaIcon
        icon={faInstagram}
      />
      <SocMediaIcon
        icon={faFacebook}
      />
      <SocMediaIcon
        icon={faTwitter}
      />
      <SocMediaIcon
        icon={faYoutube}
      />
    </ul>
  );
}

export default SocMediaIcons;
