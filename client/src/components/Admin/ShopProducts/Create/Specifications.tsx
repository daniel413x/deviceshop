import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { categorizeSpecifications } from '../../../../utils/functions';
import List from '../../../List';
import Context from '../../../../context/context';
import CopySpecificationsButton from './CopySpecificationsButton';
import AddCategoryButton from './AddCategoryButton';
import Category from './Category';

function Specifications() {
  const {
    createProductPage,
  } = useContext(Context);
  const categorizedSpecifications = categorizeSpecifications(createProductPage.specifications);
  return (
    <div className="specifications">
      <List
        items={categorizedSpecifications}
        className={`categories-ul ${createProductPage.specifications.length === 0 && 'empty'}`}
        renderAs={((specs, i) => (
          <li key={i} className={`${specs[0].category === 'General information' && 'hidden'}`}>
            <Category
              specifications={specs}
            />
          </li>
        ))}
      >
        <div className="categories-control-buttons">
          <AddCategoryButton />
          <CopySpecificationsButton />
        </div>
      </List>
    </div>
  );
}

export default observer(Specifications);
