import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Context from '../context/context';
import useActiveElement from '../hooks/useActiveElement';

interface RefocusedElementProps {
  children: any;
}

function RefocusedElement({
  children,
}: RefocusedElementProps) { // objective: save the last focus before a boolean switches to true (say, the opening of a modal) in state, then when the boolean changes to false, re-focus the element
  const {
    modals,
  } = useContext(Context);
  const noModals = modals.noModals();
  const [lastFocusBeforeModals, setLastFocusBeforeModals] = useState<Element | null>(document.activeElement);
  const refocusedElementRef = useRef<HTMLElement>(null);
  const nullFirstRender = useRef(true);
  useEffect(() => {
    if (nullFirstRender.current) {
      nullFirstRender.current = false;
      return;
    }
    if (noModals && (lastFocusBeforeModals === refocusedElementRef.current)) {
      refocusedElementRef.current?.focus();
    }
  }, [noModals]);
  const focus = useActiveElement();
  useEffect(() => {
    if (noModals && (focus === refocusedElementRef.current)) {
      setLastFocusBeforeModals(focus);
    }
  }, [focus]);
  return React.cloneElement(children, {
    ref: refocusedElementRef,
  });
}

export default RefocusedElement;
