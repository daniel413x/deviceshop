import React, {
  useContext, useEffect, useRef, useState, FormEvent,
} from 'react';
import { observer } from 'mobx-react-lite';
import { fetchFilteredSpecifications } from '../../http/specificationAPI';
import { Filter, SpecificationWithDeviceCount } from '../../types/types';
import List from '../List';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';
import Context from '../../context/context';
import LoadingAnimation from '../LoadingAnimation';
import Button from '../Button';
import FilterCheckboxButton from './FilterCheckboxButton';
import useQuery from '../../hooks/useQuery';
import { makeSlug } from '../../utils/functions';
import AngleDownIcon from '../AngleDownIcon';

interface FilterMenuProps {
  label?: string;
  specificationKey: string;
}

function FilterMenu({
  label,
  specificationKey,
}: FilterMenuProps) {
  const {
    shopPage,
  } = useContext(Context);
  const {
    setSearchParams,
  } = useQuery();
  const [loading, setLoading] = useState<boolean>(false);
  const [toggled, setShown] = useState<boolean>(false);
  const [specifications, setSpecifications] = useState<SpecificationWithDeviceCount[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(divRef, () => setShown(false));
  useEffect(() => {
    if (!toggled || specifications.length > 0) {
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const outsideActiveFilters: Filter[] = shopPage.createFiltersArray(specificationKey);
        const filteredSpecificationsReqParams = {
          primarySpecificationKey: specificationKey,
          filters: outsideActiveFilters,
        };
        const fetchedSpecifications: SpecificationWithDeviceCount[] = await fetchFilteredSpecifications(filteredSpecificationsReqParams);
        const sortedSpecifications = fetchedSpecifications.slice().sort((a, b) => b.count - a.count);
        setSpecifications(sortedSpecifications);
      } finally {
        setTimeout(() => setLoading(false), 60);
      }
    })();
  }, [toggled]);
  useEffect(() => {
    if (!toggled) {
      setSpecifications([]);
    }
  }, [shopPage.activeFilters]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    shopPage.toggleFilters();
    // await shopPage.fetchAndSetShopProducts();
    const newSearchParams = shopPage.createSearchParamsRecordFromFilters();
    setSearchParams(newSearchParams);
  };
  const showLoadingIcon = loading || specifications.length === 0;
  const showList = toggled && !loading && specifications.length > 0;
  const idFromKey = makeSlug(specificationKey);
  return (
    <div
      className={`filter-menu ${toggled && 'toggled'}`}
      ref={divRef}
      id={idFromKey}
    >
      <button
        className="toggle"
        type="button"
        onClick={() => setShown(!toggled)}
      >
        <span>
          {label || specificationKey}
        </span>
        <AngleDownIcon />
      </button>
      <form
        className={`form-wrapper ${toggled && 'toggled'}`}
        onSubmit={submit}
      >
        {showLoadingIcon && <LoadingAnimation />}
        {showList && (
        <List
          items={specifications}
          className="specifications-ul"
          renderAs={((specification) => (
            <li key={specification.id}>
              <FilterCheckboxButton
                specification={specification}
              />
            </li>
          ))}
        />
        )}
        {showList && (
        <Button
          className="submit-button"
          type="submit"
          buttonStyle="secondary"
        >
          Apply
        </Button>
        )}
      </form>
    </div>
  );
}

FilterMenu.defaultProps = {
  label: '',
};

export default observer(FilterMenu);
