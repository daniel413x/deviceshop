/* eslint-disable @typescript-eslint/no-loop-func */
/// <reference types="cypress" />

import { objectHasProp } from "../../src/utils/functions";

export const clientUrl = 'http://localhost:3000';
export const serverUrl = 'http://localhost:6006';

/*

const commandDelay = 500;
const delayedCommands = ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains'];

for (let c = 0; c < delayedCommands.length; c += 1) {
  Cypress.Commands.overwrite(delayedCommands[c], (originalFn, ...args) => {
    const origVal = originalFn(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, commandDelay);
    });
  });
}

*/

Cypress.Commands.add('postLogin', (emailOrUsername, password) => {
  const user = {
    emailOrUsername,
    password,
  };
  cy.request('POST', `${serverUrl}/api/user/login`, user)
    .then(({ body }) => {
      localStorage.setItem('registeredToken', body.token);
    });
});

Cypress.Commands.add('shouldLoad', (selector: string) => {
  cy.get(selector)
    .should('not.have.class', 'loading');
});

Cypress.Commands.add('locationIsCorrect', (string: string) => {
  const encodedString = string.replace(/\s/, '\\+');
  cy.location().should((loc) => {
    const regex = new RegExp(encodedString, 'i');
    const boolean = regex.test(loc.toString());
    expect(boolean).to.eq(true);
  });
});

Cypress.Commands.add('locationIsClean', () => {
  cy.location().should((loc) => {
    const boolean = loc.toString() === `${clientUrl}/shop`;
    expect(boolean).to.eq(true);
  });
});

Cypress.Commands.add('sideColDidLoad', () => {
  cy.get('.side-col')
    .should('not.have.class', 'loading');
});

Cypress.Commands.add('shopProductsDidLoad', () => {
  cy.wait(1000);
  cy.get('.shop-products-ul')
    .should('not.have.class', 'loading');
  cy.get('.shop-products-ul')
    .should('have.length.at.least', 1);
});

Cypress.Commands.add('shopOpenSortingDropdown', () => {
  cy.wait(300);
  cy.get('.sort-dropdown')
    .find('.toggle')
    .click({ force: true });
  cy.get('.sort-dropdown')
    .find('.callback-button')
    .as('sortingDropdownButtons');
});

Cypress.Commands.add('shopSortByRatingWorkedCorrectly', () => {
  cy.get('@sortingDropdownButtons')
    .eq(1)
    .click({ force: true });
  cy.shopProductsDidLoad();
  cy.get('.shop-product-card')
    .eq(0)
    .find('.full-star')
    .should('have.length', 5);
  cy.get('.shop-product-card')
    .eq(1)
    .find('.full-star')
    .should('have.length', 4);
});

Cypress.Commands.add('shopSortByLowestPriceWorkedCorrectly', (expectedPriceDecimal: string) => {
  cy.get('@sortingDropdownButtons')
    .eq(2)
    .click({ force: true });
  cy.shopProductsDidLoad();
  cy.get('.shop-product-card')
    .eq(0)
    .find('.discounted-price')
    .should('contain', expectedPriceDecimal);
  cy.get('.shop-product-card')
    .eq(1)
    .find('.discounted-price')
    .should('contain', expectedPriceDecimal);
});

Cypress.Commands.add('shopOpenFilterMenu', (arg: string | number) => {
  if (typeof arg === 'string') {
    cy.get(arg)
      .click({ force: true });
  } else {
    cy.get('.filter-buttons-ul')
      .find('.toggle')
      .eq(arg)
      .click({ force: true });
  }
});

Cypress.Commands.add('shopSaveFilterForm', (num: number, affix: string = '') => {
  cy.get('.filter-buttons-ul')
    .find('.toggle')
    .eq(num)
    .as(`menuToggle${affix}`);
  cy.get('.filter-buttons-ul')
    .find('.form-wrapper')
    .eq(num)
    .as('theForm');
  cy.get('@theForm')
    .find('.labeled-checkbox-button-wrapper')
    .as(`checkboxesWrappers${affix}`);
  cy.get('@theForm')
    .find('.count')
    .as(`filterCounts${affix}`);
  cy.get('.filter-buttons-ul');
  cy.get('@theForm')
    .find('.labeled-checkbox-button')
    .as(`checkboxes${affix}`);
  cy.get('@theForm')
    .find('.submit-button')
    .as(`submitButton${affix}`);
});

Cypress.Commands.add('shopOpenAndSaveFilterMenu', (num: number, affix: string = '') => {
  cy.shopOpenFilterMenu(num);
  cy.shopSaveFilterForm(num, affix);
});

Cypress.Commands.add('shopApplyFilterByIndeces', (menuIndex: number, checkboxIndeces: number[]) => {
  cy.get('.filter-buttons-ul')
    .find('.toggle')
    .eq(menuIndex)
    .click({ force: true });
  for (let i = 0; i < checkboxIndeces.length; i += 1) {
    cy.get('.filter-buttons-ul')
      .find('.form-wrapper.toggled')
      .find('.labeled-checkbox-button')
      .eq(checkboxIndeces[i])
      .click({ force: true });
  }
  cy.get('.filter-buttons-ul')
    .find('.form-wrapper.toggled')
    .find('.submit-button')
    .click({ force: true });
  cy.shopProductsDidLoad();
});

Cypress.Commands.add('shopCheckboxesDoWork', (get: string) => {
  cy.get(get)
    .find('.checkbox-div')
    .each(($checkbox, index) => {
      cy.get(get)
        .find('.checkbox-div')
        .eq(index)
        .as('currentCheckbox');
      cy.get('@currentCheckbox')
        .parent()
        .as('currentButtonElement');
      if ($checkbox.hasClass('checked')) {
        cy.get('@currentCheckbox')
          .should('have.css', 'background-color', 'rgb(255, 194, 194)');
        cy.get('@currentButtonElement')
          .click({ force: true });
        cy.get('@currentCheckbox')
          .should('not.have.css', 'background-color', 'rgb(255, 194, 194)');
        cy.get('@currentButtonElement')
          .click({ force: true });
        cy.get('@currentCheckbox')
          .should('have.css', 'background-color', 'rgb(255, 194, 194)');
      } else {
        cy.get('@currentCheckbox')
          .should('not.have.css', 'background-color', 'rgb(255, 194, 194)');
        cy.get('@currentButtonElement')
          .click({ force: true });
        cy.get('@currentCheckbox')
          .should('have.css', 'background-color', 'rgb(255, 194, 194)');
        cy.get('@currentButtonElement')
          .click({ force: true });
        cy.get('@currentCheckbox')
          .should('not.have.css', 'background-color', 'rgb(255, 194, 194)');
      }
    });
});

Cypress.Commands.add('shopCheckboxIsChecked', (get: string, num: number) => {
  cy.get(get)
    .eq(num)
    .find('.checkbox-div')
    .should('have.css', 'background-color', 'rgb(255, 194, 194)');
});

Cypress.Commands.add('shopCheckboxIsNotChecked', (get: string, value: number | string) => {
  if (typeof value === 'string') {
    cy.get(get)
      .contains(value, { matchCase: false })
      .parent()
      .find('.checkbox-div')
      .should('not.have.css', 'background-color', 'rgb(255, 194, 194)');
  } else {
    cy.get(get)
      .eq(value)
      .find('.checkbox-div')
      .should('not.have.css', 'background-color', 'rgb(255, 194, 194)');
  }
});

Cypress.Commands.add('shopDidNotGrayCheckboxes', (get: string) => {
  cy.get(get)
    .each(($wrapper) => {
      expect($wrapper).to.not.have.class('blocked');
    });
});

Cypress.Commands.add('shopProductsUlShouldAllContain', (args: string) => {
  cy.get('.shop-products-ul')
    .find('.name')
    .each(($result) => {
      const name = $result.text().toLowerCase();
      expect(name).to.contain(args.toLowerCase());
    });
});

Cypress.Commands.add('shopProductsUlShouldAllContainEither', (arr: string[]) => {
  cy.get('.shop-products-ul')
    .find('.name')
    .each(($result) => {
      const name = $result.text().toLowerCase();
      let boolean = false;
      for (let i = 0; i < arr.length; i += 1) {
        const regex = new RegExp(arr[i].toLowerCase());
        if (regex.test(name)) {
          boolean = true;
          break;
        }
      }
      assert.isTrue(boolean, 'is.true');
    });
});

Cypress.Commands.add('shopProductsUlShouldAllContainEitherCombo', (arrs: string[][]) => {
  cy.get('.shop-products-ul')
    .find('.name')
    .each(($result) => {
      const name = $result.text().toLowerCase();
      let boolean = false;
      for (let i = 0; i < arrs.length; i += 1) {
        for (let j = 0; j < arrs[i].length; j += 1) {
          const regex = new RegExp(arrs[i][j].toLowerCase());
          if (regex.test(name)) {
            boolean = true;
            break;
          }
        }
      }
      assert.isTrue(boolean, 'is.true');
    });
});

Cypress.Commands.add('shopProductsUlShouldNotAllContain', (string: string) => {
  cy.get('.shop-products-ul')
    .find('.name')
    .each(($result) => {
      expect($result.text().toLowerCase()).to.not.contain(string.toLowerCase());
    });
});

Cypress.Commands.add('shopRemoveAllFiltersViaRedButtons', () => {
  cy.get('.remove-filter-button')
    .each(($button) => {
      $button.trigger('click');
      cy.shopProductsDidLoad();
    });
});

Cypress.Commands.add('shopRemoveAllFiltersViaRedButtons', () => {
  cy.get('.remove-filter-button')
    .each(($button) => {
      $button.trigger('click');
      cy.shopProductsDidLoad();
    });
});

Cypress.Commands.add('shopFilterButtonsDidTransition', () => {
  cy.get('.remove-filter-button')
    .then((arr) => {
      const initialLength = arr.length;
      cy.get('.remove-filter-button')
        .should('have.length', initialLength - 1);
    });
});

Cypress.Commands.add('shopFilterMenuCountsDidChange', (initial: number[], countsAlias: string) => {
  const currentFilterCounts: number[] = [];
  cy.get(countsAlias)
    .each(($count) => {
      currentFilterCounts.push(Number($count.text()));
    })
    .then(() => {
      expect(currentFilterCounts).to.not.deep.eq(initial);
    });
});

Cypress.Commands.add('shopFilterMenuCountsDidNotChange', (initial: number[], countsAlias: string) => {
  const currentFilterCounts: number[] = [];
  cy.get(countsAlias)
    .each(($count) => {
      currentFilterCounts.push(Number($count.text()));
    })
    .then(() => {
      expect(currentFilterCounts).to.deep.eq(initial);
    });
});

// login

Cypress.Commands.add('enterValidRegistrationForm', () => {
  cy.get('#username-field')
    .type('adbc1234', { force: true });
  cy.get('#email-field')
    .type('adbc1234@gmail.com', { force: true });
  cy.get('#password-field')
    .type('defg5678', { force: true });
  cy.get('#confirm-password-field')
    .type('defg5678', { force: true });
});

// shop product page

Cypress.Commands.add('sliderNextClick', () => {
  cy.get('.angle-button-next')
    .click({ force: true });
});

Cypress.Commands.add('sliderPrevClick', () => {
  cy.get('.angle-button-next')
    .click({ force: true });
});

Cypress.Commands.add('shopProductPageAddToCart', () => {
  cy.get('.add-to-cart')
    .click({ force: true });
  cy.get('body')
    .should('contain.text', 'was added to your cart');
});

Cypress.Commands.add('shopProductPageAddSecondItem', () => {
  cy.visit(`${clientUrl}/shop/samsung-galaxy-256gb-android-11-5g-smartphone-2`);
  cy.shopProductPageAddToCart();
});

Cypress.Commands.add('cartDeleteItem', (index: number) => {
  cy.get('.cart-item')
    .eq(index)
    .find('.close-button')
    .click({ force: true });
  cy.get('.confirm-button')
    .click({ force: true });
});

Cypress.Commands.add('cartAddAndCheckAddon', (cartItemIndex: number, addonIndex: number) => {
  cy.wait(300);
  cy.get('.modal.show')
    .should('not.have.class', 'loading');
  let addedAddonName = '';
  cy.get('.modal.show')
    .find('.addon-choice')
    .eq(addonIndex)
    .as('theAddon');
  cy.get('@theAddon')
    .find('.choose-plan-button')
    .click({ force: true });
  cy.get('.addons-ul')
    .eq(cartItemIndex)
    .as('theCartItemAddons');
  cy.get('@theAddon')
    .find('.name')
    .then((addon) => {
      addedAddonName = addon.text();
      cy.get('.modal.show')
        .find('.addon-choice')
        .find('.name')
        .each(($addon) => {
          const addonName = $addon.text();
          if (addonName === addedAddonName) {
            cy.get('@theCartItemAddons')
              .should('contain.text', addedAddonName);
          } else {
            cy.get('@theCartItemAddons')
              .should('not.contain.text', addonName);
          }
        });
    });
});

Cypress.Commands.add('cartOneOrBothAddedItemsCanBeRemoved', () => {
  cy.cartDeleteItem(0);
  cy.get('.cart-item')
    .should('have.length', 1);
  cy.cartDeleteItem(0);
  cy.get('.cart-item')
    .should('have.length', 0);
});

Cypress.Commands.add('cartOpenWarrantyModal', () => {
  cy.get('.warranty-button')
    .eq(0)
    .click({ force: true });
});

Cypress.Commands.add('cartAddonButtonsFunctionAsExpectedWhileToggling', () => {
  cy.get('.modal.show')
    .find('.choose-plan-button')
    .each((button, i) => {
      cy.cartAddAndCheckAddon(0, i);
    });
  cy.get('.remove-plan-button')
    .should('have.length', 1);
});

Cypress.Commands.add('cartWarrantyFunctionsAsExpectedWhileToggling', () => {
  cy.cartAddAndCheckAddon(0, 0);
  cy.cartAddAndCheckAddon(0, 1);
  cy.cartAddAndCheckAddon(0, 2);
  cy.get('.remove-plan-button')
    .should('have.length', 1);
});

Cypress.Commands.add('cartAddAddon', () => {
  cy.get('.choose-plan-button')
    .eq(0)
    .click({ force: true });
});

Cypress.Commands.add('cartTestRemovePlanButton', () => {
  cy.get('.remove-plan-button')
    .click({ force: true });
  cy.get('.cart-item')
    .eq(0)
    .find('.addons-ul')
    .should('not.exist');
  cy.get('.remove-plan-button')
    .should('not.exist');
});

Cypress.Commands.add('cartOpenInsuranceModal', () => {
  cy.get('.modal.show')
    .find('.close-button')
    .click({ force: true });
  cy.get('.cart-item')
    .eq(0)
    .find('.insurance-button')
    .click({ force: true });
});

Cypress.Commands.add('cartInsuranceFunctionsAsExpectedWhileToggling', () => {
  cy.cartAddAndCheckAddon(0, 0);
  cy.cartAddAndCheckAddon(0, 1);
  cy.get('.remove-plan-button')
    .should('have.length', 1);
});

Cypress.Commands.add('cartAddInsurance', () => {
  cy.get('.modal.show')
    .find('.choose-plan-button')
    .eq(0)
    .click({ force: true });
});

Cypress.Commands.add('cartWarrantyNotReplaced', () => {
  cy.get('.modal.show')
    .find('.choose-plan-button')
    .eq(0)
    .click({ force: true });
});

Cypress.Commands.add('checkoutSelectShippingMethod', (index: number) => {
  cy.get('.shipping-fields')
    .find('.labeled-radio-button')
    .eq(index)
    .click({ force: true });
});

Cypress.Commands.add('checkoutSelectPaymentMethod', (index: number) => {
  cy.get('.payment-fields')
    .find('.labeled-radio-button')
    .eq(index)
    .click({ force: true });
});

Cypress.Commands.add('checkoutFillPaymentFields', (index: number) => {
  cy.get('#nameOnCard')
    .type('Emmanuella Pedro');
  cy.get('#cardNumber')
    .type('2342 2342 2234 2354');
  cy.get('#expirationDate')
    .type('05/22');
  cy.get('#cvc')
    .type('146');
});

Cypress.Commands.add('hasWarningBorder', (obj: any) => {
  obj.should('have.class', 'warn');
});

Cypress.Commands.add('hasNoWarningBorder', (obj: any) => {
  obj.should('not.have.class', 'warn');
});

export {};
