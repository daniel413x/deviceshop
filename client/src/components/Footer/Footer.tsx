import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/logo-large.png';
import SocMediaIcons from '../SocMediaIcons';
import {
  footerLinkSections,
} from '../../utils/arrays';
import { ReactComponent as AngleUp } from '../../assets/icons/angleup.svg';
import { INavButton } from '../../types/types';
import List from '../List';
import Dropdown from '../Dropdown';

interface LinksProps {
  links: INavButton[];
  label: string;
}

function Links({ label, links }: LinksProps) {
  return (
    <div className="links-section">
      <span className="label">
        {label}
      </span>
      <List
        items={links}
        className="links-ul"
        renderAs={(({ label: linkLabel, to }) => (
          <li key={`${linkLabel}_footer`}>
            <Dropdown
              to={to}
              label={linkLabel}
              className="link"
              colorStyle="white"
            />
          </li>
        ))}
      />
    </div>
  );
}

function Footer() {
  return (
    <div id="footer">
      <div className="wrapper">
        <div className="left-col">
          <img className="logo" src={logo} alt="Stonetech logo" />
          <span>
            Excepteur sint occaecat cupidatat non proident
          </span>
          <SocMediaIcons />
          <span>
            Privacy Policy  |  Claims Notice  |  Terms of Use
          </span>
        </div>
        <div className="right-col">
          <List
            className="links-section-ul"
            items={footerLinkSections}
            renderAs={(({ links, label }) => (
              <li key={`${label}_links-section`}>
                <Links
                  links={links}
                  label={label}
                />
              </li>
            ))}
          />
        </div>
        <NavLink
          to="#"
          className="button primary to-top-button"
          title="Return to top"
          onClick={() => window.scrollTo(0, 0)}
        >
          <AngleUp
            className="angle-up-icon"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
