import { observer } from 'mobx-react-lite';
import React, {
  useContext,
} from 'react';
import { ReactComponent as GridIcon } from '../../assets/icons/gridview.svg';
import { ReactComponent as ListItemIcon } from '../../assets/icons/listview.svg';
import Context from '../../context/context';
import SortingDropdown from '../SortingDropdown';

interface SortingButtonsRowProps {
  sorting: string;
  setSorting: (string: string) => void;
}

function SortingButtonsRow({
  sorting,
  setSorting,
}: SortingButtonsRowProps) {
  const {
    shopPage,
  } = useContext(Context);
  let sortingDropdownLabel = '';
  if (sorting === 'relevance') {
    sortingDropdownLabel = 'Relevance';
  }
  if (sorting === 'byLowestPrice') {
    sortingDropdownLabel = 'Price: Low to High';
  }
  if (sorting === 'byHighestRated') {
    sortingDropdownLabel = 'Highest Rated';
  }
  const sortingButtons = [
    {
      label: 'Relevance',
      callback: () => setSorting('relevance'),
    },
    {
      label: 'Rating',
      callback: () => setSorting('byHighestRated'),
    },
    {
      label: 'Price: Low to High',
      callback: () => setSorting('byLowestPrice'),
    },
  ];
  return (
    <div>
      <div
        className="sorting-buttons-row"
      >
        <SortingDropdown
          sortButtons={sortingButtons}
          label={sortingDropdownLabel}
        />
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
