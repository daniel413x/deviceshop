import React, {
  forwardRef,
  ReactNode,
  RefObject,
} from 'react';
import { Children, RequireAll } from '../types/types';

type StartItems<S> = {
  startItems: S[] | undefined;
  renderStartItemsAs: (list: S, index?: number) => ReactNode;
};

type EndItems<E> = {
  endItems: E[] | undefined;
  renderEndItemsAs: (list: E, index?: number) => ReactNode;
};

type OptionalProps<S, E> = RequireAll<StartItems<S>> & RequireAll<EndItems<E>>;

type ListProps<C, S, E> = {
  className?: string;
  items: C[];
  renderAs: (list: C, index?: number) => ReactNode;
  children?: Children;
  id?: string;
} & OptionalProps<S, E>;

const List = forwardRef(<C, S, E>({
  items,
  renderAs,
  className,
  id,
  children,
  startItems,
  renderStartItemsAs,
  endItems,
  renderEndItemsAs,
}: ListProps<C, S, E>, ref: any) => (
  <ul className={`${className}`} id={id} ref={ref}>
    {startItems?.map(renderStartItemsAs!)}
    {items.map(renderAs)}
    {endItems?.map(renderEndItemsAs!)}
    {children}
  </ul>
  ));

List.defaultProps = {
  className: '',
  id: '',
  children: '',
};

export default List as <C, S, E>(props: ListProps<C, S, E> & { ref?: RefObject<HTMLUListElement> }) => JSX.Element;
