import React, { useContext } from 'react';
import { ReactComponent as AddIcon } from '../../../../assets/icons/Add.svg';
import Context from '../../../../context/context';

function AddCategoryButton() {
  const {
    createProductPage,
  } = useContext(Context);
  return (
    <button
      className="categories-control-button"
      onClick={() => createProductPage.addSpecification('New category')}
      type="button"
    >
      <AddIcon
        className="icon"
      />
      <span className="label">
        Add category
      </span>
    </button>
  );
}

export default AddCategoryButton;
