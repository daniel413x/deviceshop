import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TriangleDown } from '../assets/icons/triangle-down.svg';
import { ReactComponent as AngleIcon } from '../assets/icons/angleup.svg';
import useKeyPress from '../hooks/useKeyPress';
import useOnInsideClick from '../hooks/useOnInsideClick';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import { INavButton } from '../types/types';
import List from './List';
import NavButton from './NavButton';

interface DropdownProps {
  to?: string | INavButton[];
  label: string;
  callback?: () => void;
  dropdownIcon?: 'angle' | 'triangle';
  colorStyle?: 'gray' | 'accent' | 'white';
  className?: string;
}

function Dropdown({
  to,
  label,
  callback,
  dropdownIcon,
  colorStyle,
  className,
}: DropdownProps) {
  if (callback) {
    return (
      <button
        className={`dropdown callback-button ${className} ${colorStyle}`}
        onClick={callback}
        key={label}
        type="button"
      >
        {label}
      </button>
    );
  }
  const embeddedDropdown = Array.isArray(to);
  if (!embeddedDropdown) {
    return (
      <NavButton
        to={to as string}
        key={label}
        className={`dropdown ${className} ${colorStyle}`}
      >
        {label}
      </NavButton>
    );
  }
  const [highlight, setHighlight] = useState<number>(-1);
  const [shown, setShown] = useState<boolean>(false);
  const cannotHighlight = highlight === -1;
  const ulRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const enterPress = useKeyPress('Enter');
  const escapePress = useKeyPress('Escape');
  const tabPress = useKeyPress('Tab');
  useOnOutsideClick(
    wrapperRef,
    () => {
      if (!shown) {
        return;
      }
      setTimeout(() => setShown(false), 1);
    },
  );
  useOnInsideClick(
    wrapperRef,
    () => {
      if (!shown) {
        return;
      }
      setTimeout(() => setShown(false), 1);
    },
    {
      lookForClasses: ['nav-button'],
      excludeClasses: ['toggle'],
    },
  );
  useOnInsideClick(
    wrapperRef,
    () => {
      if (!shown) {
        return;
      }
      setHighlight(-1);
    },
  );
  useEffect(() => {
    if (shown) {
      setHighlight(0);
    } else {
      setHighlight(-1);
    }
  }, [shown]);
  useEffect(() => {
    if (wrapperRef.current?.contains(document.activeElement)) {
      setTimeout(() => setShown(false), 1);
    }
  }, [escapePress]);
  useEffect(() => {
    if (!wrapperRef.current?.contains(document.activeElement)) {
      return;
    }
    if (cannotHighlight) {
      return;
    }
    const highlightedLi = ulRef.current?.children.item(highlight) as HTMLElement;
    const focusableElement = (highlightedLi.querySelector('button') || highlightedLi.querySelector('a')) as HTMLElement;
    focusableElement.focus();
  }, [highlight]);
  useEffect(() => {
    if (enterPress) {
      const activeElement = document.activeElement as HTMLElement;
      if (!wrapperRef.current?.contains(activeElement) || cannotHighlight) {
        return;
      }
      setHighlight(-1);
    }
  }, [enterPress]);
  useEffect(() => {
    if (!shown) {
      return;
    }
    setTimeout(() => {
      if (!ulRef.current?.contains(document.activeElement)) {
        setShown(false);
      }
    }, 1);
  }, [tabPress, document.activeElement]);
  return (
    <div
      className={`dropdown wrapper ${shown && 'shown'} ${colorStyle}`}
      ref={wrapperRef}
    >
      <button
        className={`toggle ${shown && 'shown'} ${className}`}
        onClick={() => setShown(!shown)}
        type="button"
      >
        {dropdownIcon === 'triangle' && <TriangleDown />}
        {label}
        {dropdownIcon === 'angle' && (
          <AngleIcon
            className="angle-icon"
          />
        )}
      </button>
      <List
        ref={ulRef}
        className={`items ${shown && 'shown'}`}
        items={to as []}
        renderAs={({ to: embeddedTo, label: embeddedLabel, callback: embeddedCallback }, index) => (
          <li
            key={embeddedLabel}
            className={`${highlight === index && 'highlight'}`}
          >
            <Dropdown
              to={embeddedTo}
              label={embeddedLabel}
              callback={embeddedCallback}
              className={className}
            />
          </li>
        )}
      />
    </div>
  );
}

Dropdown.defaultProps = {
  to: '#',
  callback: false,
  dropdownIcon: 'triangle',
  colorStyle: 'accent',
  className: '',
};

export default Dropdown;
