import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import List from '../../../List';
import Context from '../../../../context/context';
import CopySpecificationsButton from './CopySpecificationsButton';
import AddCategoryButton from './AddCategoryButton';
import Category from './Category';

function Specifications() {
  const {
    createProductPage,
  } = useContext(Context);
  return (
    <div className="specifications">
      <List
        items={createProductPage.specifications}
        className={`categories-ul ${createProductPage.specifications.length === 0 && 'empty'}`}
        renderAs={((cat, i) => (
          <li key={i}>
            <Category
              specificationCategory={cat}
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
