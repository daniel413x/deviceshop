import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';
import { makeSlug } from '../../utils/functions';
import { IShopProduct } from '../../types/types';

interface SearchResultProps {
  result: IShopProduct;
}

const SearchResult = observer(({
  result,
}: SearchResultProps) => {
  const {
    name,
    id,
  } = result;
  const slug = makeSlug(result.name);
  return (
    <NavLink className="results-item" to={`/${SHOP_ROUTE}/${slug}`} key={id}>
      <div>
        <div className="name" title={name}>{name}</div>
      </div>
    </NavLink>
  );
});

export default SearchResult;
