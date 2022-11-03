import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TriangleDown } from '../assets/icons/triangle-down.svg';
import useKeyPress from '../hooks/useKeyPress';
import useOnInsideClick from '../hooks/useOnInsideClick';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import { INavButton } from '../types/types';
import List from './List';

interface RecursivelyRenderedElementProps {
  to: string | INavButton[];
  label: string;
}

function RecursivelyRenderedElement({ to, label }: RecursivelyRenderedElementProps) {
  const embeddedDropdown = Array.isArray(to);
  if (!embeddedDropdown) {
    return (
      <NavLink
        className="nav-button"
        to={to as string}
        key={label}
      >
        {label}
      </NavLink>
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
      className={`dropdown ${shown && 'shown'}`}
      ref={wrapperRef}
    >
      <button
        className={`toggle ${shown && 'shown'}`}
        onClick={() => setShown(!shown)}
        type="button"
      >
        <TriangleDown />
        {label}
      </button>
      <List
        ref={ulRef}
        className={`items ${shown && 'shown'}`}
        items={to as []}
        renderAs={({ to: embeddedTo, label: embeddedLabel }, index) => (
          <li
            key={embeddedLabel}
            className={`${highlight === index && 'highlight'}`}
          >
            <RecursivelyRenderedElement
              to={embeddedTo}
              label={embeddedLabel}
            />
          </li>
        )}
      />
    </div>
  );
}

interface NavButtonsAndDropdownsProps {
  items: INavButton[];
  className?: string;
}

function NavButtonsAndDropdowns({ items, className }: NavButtonsAndDropdownsProps) {
  return (
    <List
      items={items}
      className={className}
      renderAs={({ to, label }) => (
        <li key={label}>
          <RecursivelyRenderedElement
            to={to}
            label={label}
          />
        </li>
      )}
    />
  );
}

NavButtonsAndDropdowns.defaultProps = {
  className: '',
};

export default NavButtonsAndDropdowns;
