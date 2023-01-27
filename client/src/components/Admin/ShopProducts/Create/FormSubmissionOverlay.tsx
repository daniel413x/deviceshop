import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
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
import { createProduct, updateProduct } from '../../../../http/shopProductAPI';
import CreationSuccessModal from './CreationSuccessModal';
import { makeSlug } from '../../../../utils/functions';

function FormSubmissionOverlay() {
  const {
    createProductPage,
    types,
    brands,
    notifications,
  } = useContext(Context);
  const putForm = createProductPage.id;
  const submitLabel = putForm ? 'Update' : 'Create';
  const {
    md,
  } = useBreakpoints();
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<IType | undefined>(undefined);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | undefined>(undefined);
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);
  const typeButtons = types.all.map((type) => ({
    label: type.name,
    callback: () => setSelectedType(type),
  }));
  const brandButtons = brands.all.map((brand) => ({
    label: brand.name,
    callback: () => setSelectedBrand(brand),
  }));
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    const noImages = createProductPage.images.length === 0;
    if (!selectedBrand || !selectedBrand || !createProductPage.name || !createProductPage.description || noImages) {
      notifications.error(
        'Required fields missing',
      );
      return;
    }
    try {
      createProductPage.setLoading(true);
      const form = new FormData();
      form.append('name', createProductPage.name);
      form.append('brandId', selectedBrand!.id);
      form.append('typeId', selectedType!.id);
      form.append('discount', createProductPage.discount as string);
      form.append('stock', createProductPage.stock as string);
      form.append('description', createProductPage.description);
      form.append('price', createProductPage.price as string);
      form.append('specifications', JSON.stringify(createProductPage.specifications));
      createProductPage.images.filter((image) => image.file).forEach((image) => {
        form.append(image.replaces || image.url, image.file);
      });
      if (putForm) {
        if (createProductPage.deletedImages.length > 0) {
          form.append('deletedImages', JSON.stringify(createProductPage.deletedImages));
        }
        window.history.pushState(null, 'Edit product', makeSlug(createProductPage.name));
        const updatedProduct = await updateProduct(createProductPage.id, form);
        createProductPage.setImages(updatedProduct.images);
        notifications.message(
          'Shop product was successfully updated',
        );
      } else {
        const { newProduct, newProductSpecifications } = await createProduct(form);
        createProductPage.setId(newProduct.id);
        createProductPage.setImages(newProduct.images);
        createProductPage.setSpecifications(newProductSpecifications);
        setCreationSuccess(true);
      }
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    } finally {
      createProductPage.setLoading(false);
    }
  };
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
      <CreationSuccessModal
        show={creationSuccess}
        close={() => setCreationSuccess(false)}
      />
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
      <form onSubmit={submit}>
        <div className="line one">
          <DropdownField
            label="Brand"
            value={selectedBrand?.name}
            colorStyle="accent-secondary"
            items={brandButtons}
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            placeholder="Select brand"
          />
          <DropdownField
            label="Type"
            value={selectedType?.name}
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
            input={createProductPage.images.length.toString()}
            setInput={() => null}
            label="Images"
            placeholder="Device images"
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
            warnCondition={createProductPage.images.length === 0}
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
            warnCondition={createProductPage.name === '' || createProductPage.name === 'Product name'}
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
            warnCondition={createProductPage.description === '' || createProductPage.description === 'Product description'}
          />
          <Button
            className="submit-button"
            type="submit"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default observer(FormSubmissionOverlay);
