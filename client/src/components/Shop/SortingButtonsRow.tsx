import { observer } from 'mobx-react-lite';
import React, {
  useContext,
} from 'react';
import { ReactComponent as GridIcon } from '../../assets/icons/gridview.svg';
import { ReactComponent as ListItemIcon } from '../../assets/icons/listview.svg';
import Context from '../../context/context';
import Dropdown from '../Dropdown';

function SortingButtonsRow() {
  const {
    shopPage,
  } = useContext(Context);
  let sortingDropdownLabel = '';
  if (shopPage.sorting === 'relevance') {
    sortingDropdownLabel = 'Relevance';
  }
  if (shopPage.sorting === 'byLowestPrice') {
    sortingDropdownLabel = 'Price: Low to High';
  }
  if (shopPage.sorting === 'byHighestRated') {
    sortingDropdownLabel = 'Highest Rated';
  }
  const sortingButtons = {
    label: sortingDropdownLabel,
    to: [
      {
        label: 'Relevance',
        callback: () => shopPage.changeSorting('relevance'),
      },
      {
        label: 'Rating',
        callback: () => shopPage.changeSorting('byHighestRated'),
      },
      {
        label: 'Price: Low to High',
        callback: () => shopPage.changeSorting('byLowestPrice'),
      },
    ],
  };
  return (
    <div>
      <div
        className="sorting-buttons-row"
      >
        <div className="sort-buttons">
          <span>
            Sort by:
          </span>
          <Dropdown
            label={sortingButtons.label}
            to={sortingButtons.to}
            dropdownIcon="angle"
            colorStyle="gray"
          />
          <div className="divider vertical" />
        </div>
        <div className="view-buttons">
          <button
            title="Grid view"
            type="button"
            onClick={() => shopPage.changeViewMode('grid')}
          >
            <GridIcon
              className={`view-icon ${shopPage.view === 'grid' && 'active'}`}
            />
          </button>
          <div className="divider vertical" />
          <button
            title="List view"
            type="button"
            onClick={() => shopPage.changeViewMode('list')}
          >
            <ListItemIcon
              className={`view-icon ${shopPage.view === 'list' && 'active'}`}
            />
          </button>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}

export default observer(SortingButtonsRow);
