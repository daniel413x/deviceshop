import React, { forwardRef, RefObject, useRef } from 'react';
import useFixatedInView from '../hooks/useFixatedInView';
import { Children } from '../types/types';

interface ShownInViewProps {
  className?: string;
  id?: string;
  children: Children;
  timeout?: number;
  func?: () => void;
}

const ShownInView = forwardRef(({
  className,
  children,
  id,
  timeout,
  func,
}: ShownInViewProps, passedInRef: any) => {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = passedInRef || defaultRef;
  const { fixated, loaded } = useFixatedInView({
    ref,
    func,
    timeout,
    id,
  });
  const preventPrematureLoad = func && !loaded;
  return (
    <div
      className={`${className} shown-in-view ${((func && loaded) || (!func && fixated)) && 'show'}`}
      id={id}
      ref={ref}
      style={{ height: preventPrematureLoad ? '100vh' : '' }}
    >
      {/* should add .loading { height: 100vh } to uppermost components to prevent premature loading of the rest of the components */}
      {children}
    </div>
  );
});

ShownInView.defaultProps = {
  className: '',
  id: undefined,
  timeout: undefined,
  func: undefined,
};

export default ShownInView as (props: ShownInViewProps & { passedInRef?: RefObject<any> }) => JSX.Element;
