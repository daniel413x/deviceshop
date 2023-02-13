import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { Children, RequireAll } from '../types/types';

type FillerProps = {
  fillerElement: ReactElement;
  fillersNeeded: number;
};

type StartItemsProps<S> = {
  startItems: S[] | undefined;
  renderStartItemsAs: (list: S, index?: number) => ReactNode;
};

type EndItemsProps<E> = {
  endItems: E[] | undefined;
  renderEndItemsAs: (list: E, index?: number) => ReactNode;
};

type OptionalProps<S, E> = RequireAll<StartItemsProps<S>> & RequireAll<EndItemsProps<E>> & RequireAll<FillerProps>;

type ListProps<C, S, E> = {
  className?: string;
  items: C[];
  renderAs: (list: C, index?: number) => ReactNode;
  children?: Children;
  childrenBefore?: boolean;
  id?: string;
} & OptionalProps<S, E>;

const List = forwardRef(<C, S, E>({
  items,
  renderAs,
  className,
  id,
  children,
  childrenBefore,
  startItems,
  renderStartItemsAs,
  endItems,
  renderEndItemsAs,
  fillerElement,
  fillersNeeded,
}: ListProps<C, S, E>, ref: any) => {
  const useFillers = fillerElement;
  let fillerCount: any;
  if (fillerElement && fillersNeeded) {
    fillerCount = [];
    for (let i = 0; i < fillersNeeded; i += 1) {
      fillerCount.push('s');
    }
  }
  return (
    <ul className={`${className}`} id={id} ref={ref}>
      {childrenBefore && children}
      {startItems && startItems.map(renderStartItemsAs!)}
      {items?.map(renderAs)}
      {endItems && endItems.map(renderEndItemsAs!)}
      {!childrenBefore && children}
      {useFillers && fillerCount.map((filler: string, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`${id}_filler${i}`}>
          {fillerElement}
        </li>
      ))}
    </ul>
  );
});

List.defaultProps = {
  className: '',
  id: '',
  children: '',
  childrenBefore: false,
};

export default List as <C, S, E>(props: ListProps<C, S, E> & { ref?: RefObject<HTMLUListElement> }) => JSX.Element;
