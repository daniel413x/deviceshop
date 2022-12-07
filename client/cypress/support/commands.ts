/* eslint-disable @typescript-eslint/no-loop-func */
/// <reference types="cypress" />

export const clientUrl = 'http://localhost:3000';
export const serverUrl = 'http://localhost:6004';

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

export {};
