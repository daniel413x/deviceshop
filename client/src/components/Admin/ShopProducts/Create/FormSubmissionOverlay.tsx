import React, {
  useContext, useEffect, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';
import {
  IBrand, IType,
} from '../../../../types/types';
import Context from '../../../../context/context';
import Button from '../../../Button';
import { ReactComponent as MinimizeIcon } from '../../../../assets/icons/Minimize.svg';
import { ReactComponent as AngleUp } from '../../../../assets/icons/angleup.svg';
import LabeledInput from '../../../LabeledInput';
import DropdownField from '../../../DropdownField';
import useBreakpoints from '../../../../hooks/useBreakpoints';

interface FormSubmissionOverlayProps {
  pressedSubmit: boolean;
  setPressedSubmit: (bool: boolean) => void;
}

function FormSubmissionOverlay({
  pressedSubmit,
  setPressedSubmit,
}: FormSubmissionOverlayProps) {
  const {
    createProductPage,
    types,
    brands,
  } = useContext(Context);
  const {
    loading,
  } = createProductPage;
  const putForm = createProductPage.id;
  const submitLabel = putForm ? 'Update' : 'Create';
  const {
    md,
  } = useBreakpoints();
  const { pathname } = useLocation();
  const isDemo = pathname.split('/').filter(Boolean)[0] === 'demo';
  const [expanded, setExpanded] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<IType | undefined>(undefined);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | undefined>(undefined);
  const typeButtons = types.all.map((type) => ({
    label: type.name,
    callback: () => setSelectedType(type),
  }));
  const brandButtons = brands.all.map((brand) => ({
    label: brand.name,
    callback: () => setSelectedBrand(brand),
  }));
  useEffect(() => {
    if (createProductPage.id) {
      if (!selectedType) {
        setSelectedType(createProductPage.type);
      }
      if (!selectedBrand) {
        setSelectedBrand(createProductPage.brand);
      }
    }
  }, [createProductPage.id]);
  return (
    <div className={`form-submission-overlay ${expanded && 'expanded'}`}>
      <Button
        type="button"
        className={`minimize-button ${!md && 'mobile'}`}
        onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
      >
        {expanded ? <MinimizeIcon /> : <AngleUp />}
      </Button>
      {!expanded && (
        <button
          type="button"
          className="expand-button"
          onClick={() => setExpanded(true)}
          aria-label="Tap to expand"
        />
      )}
      <div className="form-values">
        <div className="line one">
          <DropdownField
            label="Brand"
            name="brandId"
            value={selectedBrand?.id || ''}
            shownValue={selectedBrand?.name}
            colorStyle="accent-secondary"
            items={brandButtons}
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            placeholder="Select brand"
          />
          <DropdownField
            label="Type"
            name="typeId"
            value={selectedType?.id || ''}
            shownValue={selectedType?.name}
            colorStyle="accent-secondary"
            items={typeButtons}
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            placeholder="Select type"
          />
        </div>
        <div className="line two">
          <LabeledInput
            className="form-field images"
            input={createProductPage.imagesCount.toString()}
            setInput={() => null}
            label="Images"
            placeholder="Device images"
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            warnCondition={createProductPage.missingImages()}
            id="images"
          />
          <LabeledInput
            className="form-field name"
            input={createProductPage.name}
            // eslint-disable-next-line react/jsx-no-bind
            setInput={createProductPage.setName.bind(createProductPage)}
            label="Name"
            placeholder="Device name"
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            id="name"
            warnCondition={createProductPage.missingName()}
          />
        </div>
        <div className="line three">
          <LabeledInput
            className="form-field"
            input={createProductPage.price.toString()}
            // eslint-disable-next-line react/jsx-no-bind
            setInput={createProductPage.setPrice.bind(createProductPage)}
            placeholder="Device price (req.)"
            label="Price ($)"
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            id="price"
          />
          <LabeledInput
            className="form-field"
            input={createProductPage.discount.toString()}
            // eslint-disable-next-line react/jsx-no-bind
            setInput={createProductPage.setDiscount.bind(createProductPage)}
            placeholder="Device discount"
            label="Discount (%)"
            id="discount"
          />
          <LabeledInput
            className="form-field"
            input={createProductPage.stock as string}
            // eslint-disable-next-line react/jsx-no-bind
            setInput={createProductPage.setStock.bind(createProductPage)}
            placeholder="Initial stock"
            label="Initial stock"
            id="stock"
          />
        </div>
        <div className="line four">
          <LabeledInput
            className="form-field"
            input={createProductPage.description}
            // eslint-disable-next-line react/jsx-no-bind
            setInput={createProductPage.setDescription.bind(createProductPage)}
            label="Description"
            placeholder="Device description"
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            id="description"
            name="description"
            warnCondition={createProductPage.missingDescription()}
          />
          <Button
            className={`submit-button ${(loading || isDemo) && 'blocked'}`}
            type="submit"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default observer(FormSubmissionOverlay);
