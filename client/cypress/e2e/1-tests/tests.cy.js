/* eslint-disable no-undef */
import {
  CANCELLATION_REQUESTED,
  CART_ROUTE,
  CHECKOUT_ROUTE,
  PROCESSING,
  CANCELED,
  LOGOUT_ROUTE,
  LOGIN_ROUTE,
} from '../../../src/utils/consts';
import { clientUrl, serverUrl } from '../../support/commands';
import { convertPriceToInt } from '../../../src/utils/functions';

/// <reference types="cypress" />

describe('deviceshop app', () => {
  beforeEach(() => {
    cy.request('POST', `${serverUrl}/api/testing/reset`);
    cy.visit(clientUrl);
  });
  describe('as a guest', () => {
    describe('on the front page', () => {
      beforeEach(() => {
        cy.get('.slider')
          .find('img')
          .should('exist');
        cy.get('.browse-the-shop')
          .find('img')
          .should('exist');
      });
      it('initializes with off-screen elements hidden', () => {
        cy.get('.trending')
          .should('not.have.class', 'shown');
        cy.get('.in-depth')
          .should('not.have.class', 'shown');
        cy.get('.recently-reviewed')
          .should('not.have.class', 'shown');
      });
      describe('using the navbar', () => {
        beforeEach(() => {
          cy.get('.slider');
          cy.get('.browse-the-shop')
            .find('img');
        });
        it('shows a dropdown menu upon clicking one of the toggles', () => {
          cy.get('#navbar')
            .find('.toggle')
            .eq(0)
            .click({ force: true });
          cy.get('#navbar')
            .find('.dropdown')
            .eq(0)
            .find('.items')
            .should('be.visible');
        });
        describe('a dropdown menu is toggled and shown', () => {
          beforeEach(() => {
            cy.get('#navbar')
              .find('.toggle')
              .eq(1)
              .click({ force: true });
            cy.get('#navbar')
              .find('.items')
              .eq(1)
              .as('theParentDropdown');
          });
          it('closes the dropdown upon clicking a link', () => {
            cy.get('@theParentDropdown')
              .children()
              .eq(0)
              .click({ force: true });
            cy.get('@theParentDropdown')
              .should('not.be.visible');
          });
          it('closes the dropdown upon clicking outside the list', () => {
            cy.get('#navbar')
              .click({ force: true });
            cy.get('@theParentDropdown')
              .should('not.have.class', 'shown');
          });
          it('shows a nested dropdown menu upon clicking a nested toggle ', () => {
            cy.get('@theParentDropdown')
              .find('.toggle')
              .click({ force: true });
          });
          describe('a nested dropdown menu is toggled and shown', () => {
            beforeEach(() => {
              cy.get('@theParentDropdown')
                .find('.toggle')
                .click({ force: true });
              cy.get('@theParentDropdown')
                .find('.items')
                .as('theNestedDropdown');
            });
            it('clicking on the nested toggle again closes the nested dropdown', () => {
              cy.get('@theParentDropdown')
                .find('.toggle')
                .click({ force: true });
              cy.get('@theNestedDropdown')
                .should('not.be.visible');
            });
            it('clicking on a link in the parent dropdown closes both dropdowns', () => {
              cy.get('@theParentDropdown')
                .find('.nav-button')
                .eq(0)
                .click({ force: true });
              cy.get('@theParentDropdown')
                .should('not.be.visible');
              cy.get('@theNestedDropdown')
                .should('not.be.visible');
            });
            it('clicking on a link in the nested dropdown closes both dropdowns', () => {
              cy.get('@theNestedDropdown')
                .find('.nav-button')
                .eq(0)
                .click({ force: true });
              cy.get('@theParentDropdown')
                .should('not.be.visible');
              cy.get('@theNestedDropdown')
                .should('not.be.visible');
            });
            it('clicking outside closes both dropdowns', () => {
              cy.get('#navbar')
                .click({ force: true });
              cy.get('@theParentDropdown')
                .should('not.be.visible');
              cy.get('@theNestedDropdown')
                .should('not.be.visible');
            });
          });
        });
        describe('using the searchbar', () => {
          it('fetches and renders results', () => {
            cy.get('#navbar')
              .find('input')
              .type('s');
            cy.get('.results-container')
              .should('be.visible');
            cy.get('.results-container')
              .find('li')
              .should('have.length.greaterThan', 1);
          });
          it('fetches and renders only Samsung or Apple products upon respective input', () => {
            cy.get('#navbar')
              .find('input')
              .type('samsung');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Samsung');
              });
            cy.get('#navbar')
              .find('input')
              .clear()
              .type('apple');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Apple');
              });
          });
          it('fetches and renders only 128GB or 256GB products upon respective input', () => {
            cy.get('#navbar')
              .find('input')
              .type('256');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('256');
              });
            cy.get('#navbar')
              .find('input')
              .clear()
              .type('128');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('128');
              });
          });
          it('fetches and renders only 128GB Samsung, 128GB Apple, 256GB Samsung or 256GB Apple products upon respective input ', () => {
            cy.get('#navbar')
              .find('input')
              .type('apple 128');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Apple');
                expect($result.text()).to.contain('128');
              });
            cy.get('#navbar')
              .find('input')
              .clear()
              .type('samsung 128');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Samsung');
                expect($result.text()).to.contain('128');
              });
            cy.get('#navbar')
              .find('input')
              .clear()
              .type('samsung 256');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Samsung');
                expect($result.text()).to.contain('256');
              });
            cy.get('#navbar')
              .find('input')
              .clear()
              .type('apple 256');
            cy.get('.results-container')
              .find('.name')
              .each(($result) => {
                expect($result.text()).to.contain('Apple');
                expect($result.text()).to.contain('256');
              });
          });
          it('renders a "no results" item if no results were fetched', () => {
            cy.get('#navbar')
              .find('input')
              .type('asdfc');
            cy.get('.results-container')
              .contains('No results');
          });
        });
      });
      describe('slider', () => {
        beforeEach(() => {
          cy.get('.slider')
            .as('theSlider');
          cy.get('.slick-slide')
            .eq(1)
            .as('slideOne');
          cy.get('.slick-slide')
            .eq(2)
            .as('slideTwo');
          cy.get('.slick-slide')
            .eq(3)
            .as('slideThree');
          cy.get('.slider')
            .as('theSlider');
        });
        describe('using the dots', () => {
          beforeEach(() => {
            cy.get('@theSlider')
              .find('.dot')
              .as('dots');
            cy.get('@dots')
              .eq(0)
              .as('dotOne');
            cy.get('@dots')
              .eq(2)
              .as('dotThree');
          });
          it('initializes with the first slider image properly indicated in the dots', () => {
            cy.get('@dotOne')
              .should('have.class', 'active');
          });
          it('switches to the third slide upon clicking the third dot', () => {
            cy.wait(700);
            cy.get('@dotThree')
              .click({ force: true });
            cy.get('@dotThree')
              .should('have.class', 'active');
            cy.get('@slideThree')
              .should('have.class', 'slick-active');
          });
        });
        describe('using the next/prev angle buttons', () => {
          beforeEach(() => {
            cy.get('@theSlider')
              .find('.angle-button-next')
              .as('nextButton');
          });
          it('properly navigates through the slides', () => {
            cy.wait(1400);
            cy.get('@nextButton')
              .click({ force: true });
            cy.get('@slideTwo')
              .should('have.class', 'slick-active');
            cy.wait(2750);
            cy.get('@nextButton')
              .click({ force: true });
            cy.get('@slideThree')
              .should('have.class', 'slick-active');
            cy.wait(2750);
            cy.get('.angle-button-prev')
              .click({ force: true });
            cy.get('@slideTwo')
              .should('have.class', 'slick-active');
          });
        });
      });
      it(('lazy loads page elements'), () => {
        let elementsHeight = 300;
        cy.get('.trending-items.top-row')
          .should('not.be.visible');
        cy.get('.slider')
          .then((slider) => {
            elementsHeight += slider.innerHeight();
            cy.scrollTo(0, elementsHeight, { duration: 0 });
            cy.get('.browse-the-shop')
              .then((browse) => {
                elementsHeight += browse.innerHeight();
                cy.scrollTo(0, elementsHeight, { duration: 0 });
                cy.get('.trending-items.top-row')
                  .should('be.visible');
                cy.get('.trending-items.top-row')
                  .then((trendingItemsTopRow) => {
                    elementsHeight += trendingItemsTopRow.innerHeight();
                    cy.scrollTo(0, elementsHeight, { duration: 0 });
                    cy.get('.trending-items.top-row')
                      .should('be.visible');
                  });
              });
          });
      });
    });
    describe('on /shop', () => {
      const productsPerPage = 15;
      let initialProductCount = 0;
      beforeEach(() => {
        cy.visit(`${clientUrl}/shop`);
        cy.shopProductsDidLoad();
        cy.sideColDidLoad();
      });
      it('displays a breadcrumb trail with two elements', () => {
        cy.get('.breadcrumb-trail')
          .children()
          .should('have.length', 2);
      });
      it('displays a dropdown for sorting options upon clickng the lefthand button labeled "Relevance"', () => {
        cy.shopOpenSortingDropdown();
      });
      describe('the sorting dropdown menu is engaged', () => {
        beforeEach(() => {
          cy.shopOpenSortingDropdown();
        });
        it('correctly sorts shop products by rating', () => {
          cy.shopSortByRatingWorkedCorrectly();
        });
        it('correctly sorts shop products by lowest to highest prices', () => {
          cy.shopSortByLowestPriceWorkedCorrectly('8.00');
        });
      });
      it('displays filter options menus upon clicking the filter buttons', () => {
        cy.shopOpenFilterMenu(0);
        cy.get('.filter-buttons-ul')
          .find('.form-wrapper')
          .eq(0)
          .should('be.visible');
        cy.shopOpenFilterMenu(1);
        cy.get('.filter-buttons-ul')
          .find('.form-wrapper')
          .eq(1)
          .should('be.visible');
      });
      describe('the "Manufacturers" filter menu is engaged', () => {
        let initialManufacturerFilterCounts = [];
        beforeEach(() => {
          cy.shopOpenAndSaveFilterMenu(1, 'M', initialManufacturerFilterCounts);
          const arr = [];
          cy.get('@filterCountsM')
            .each(($count) => {
              arr.push(Number($count.text()));
              initialManufacturerFilterCounts = arr;
            });
        });
        it('checks and unchecks checkboxes upon clicking them', () => {
          cy.shopCheckboxesDoWork('@checkboxesM');
        });
        describe('a filter checkbox is checked', () => {
          let filterKeyM = '';
          let valueOneM = '';
          beforeEach(() => {
            cy.get('@menuToggleM')
              .then(($label) => {
                filterKeyM = $label.text();
              });
            cy.get('@checkboxesM')
              .eq(0)
              .then(($label) => {
                valueOneM = $label.text();
              });
            cy.get('@checkboxesM')
              .eq(0)
              .click({ force: true });
            cy.get('.product-count')
              .find('.figure')
              .then(($figure) => {
                initialProductCount = Number($figure.text());
              });
          });
          it('did not check the other checkbox', () => {
            cy.shopCheckboxIsNotChecked('@checkboxesM', 1);
          });
          it('applies a filter upon clicking submit', () => {
            cy.get('@submitButtonM')
              .click({ force: true });
            cy.shopProductsDidLoad();
          });
          describe('a filter is applied', () => {
            beforeEach(() => {
              cy.get('@submitButtonM')
                .click({ force: true });
              cy.shopProductsDidLoad();
            });
            it('does not uncheck the filter\'s checkbox after submission', () => {
              cy.shopCheckboxIsChecked('@checkboxesM', 0);
            });
            it('does not erroneously check the other checkboxes', () => {
              cy.shopCheckboxIsNotChecked('@checkboxesM', 1);
              cy.shopCheckboxIsNotChecked('@checkboxesM', 2);
            });
            it('does not gray out other checkbox buttons within the same filter category', () => {
              cy.shopDidNotGrayCheckboxes('@checkboxesWrappersM');
            });
            it('is possible to check and uncheck each checkbox', () => {
              cy.shopCheckboxesDoWork('@checkboxesM');
            });
            it('does not change product counts for the other filter keys in the "Manufacturer" category', () => {
              cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
            });
            it('generates a red remove filter button', () => {
              cy.get('.remove-filter-button')
                .should('have.length', 1);
            });
            it('can be removed by unchecking and submitting its checkbox', () => {
              cy.get('@checkboxesM')
                .eq(0)
                .click({ force: true });
              cy.get('@submitButtonM')
                .click({ force: true });
              cy.shopCheckboxIsNotChecked('@checkboxesM', 0);
            });
            it('shows only products according to the selected filter', () => {
              cy.shopProductsUlShouldAllContain(valueOneM);
            });
            it('handles search params/location correctly', () => {
              // regex
              cy.locationIsCorrect(`${filterKeyM}=${valueOneM}`);
            });
            it('changes the shop product count in accordance with the chosen filter', () => {
              cy.get('.product-count')
                .find('.figure')
                .should('not.contain', initialProductCount);
              cy.get('.product-count')
                .find('.figure')
                .then(($figure) => {
                  expect(Number($figure.text())).to.eq(initialManufacturerFilterCounts[0]);
                });
            });
            it('applies a second filter', () => {
              cy.get('@checkboxesM')
                .eq(1)
                .click({ force: true });
              cy.get('@submitButtonM')
                .click({ force: true });
              cy.shopProductsDidLoad();
            });
            describe('a second filter is applied', () => {
              let valueTwoM = '';
              beforeEach(() => {
                cy.get('@checkboxesM')
                  .eq(1)
                  .then(($value) => {
                    valueTwoM = $value.text();
                  });
                cy.get('@checkboxesM')
                  .eq(1)
                  .click({ force: true });
                cy.get('@submitButtonM')
                  .click({ force: true });
                cy.shopProductsDidLoad();
              });
              it('does not uncheck the filter\'s checkbox after submission', () => {
                cy.shopCheckboxIsChecked('@checkboxesM', 1);
              });
              it('does not gray out other checkbox buttons within the same filter category', () => {
                cy.shopDidNotGrayCheckboxes('@checkboxesWrappersM');
              });
              it('shows only products according to the selected filters', () => {
                cy.shopProductsUlShouldAllContainEither([valueOneM, valueTwoM]);
              });
              it('does not change product counts for the other filter keys in the "Manufacturer" category', () => {
                cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
              });
              it('changes the shop product count according to both selected filters', () => {
                cy.get('.product-count')
                  .find('.figure')
                  .then(($figure) => {
                    expect(Number($figure.text())).to.eq(initialManufacturerFilterCounts[0] + initialManufacturerFilterCounts[1]);
                  });
              });
              it('handled search params/location correctly', () => {
                // regex
                cy.locationIsCorrect(`${filterKeyM}=((${valueOneM}%7C${valueTwoM})|((${valueTwoM}%7C${valueOneM})))`);
              });
              it('can be removed individually by unchecking and submitting its checkbox', () => {
                cy.get('@checkboxesM')
                  .eq(1)
                  .click({ force: true });
                cy.get('@submitButtonM')
                  .click({ force: true });
                cy.shopCheckboxIsNotChecked('@checkboxesM', 1);
                cy.shopCheckboxIsChecked('@checkboxesM', 0);
              });
              describe('one filter is removed', () => {
                let removedValMOne = '';
                beforeEach(() => {
                  cy.get('.remove-filter-button')
                    .eq(0)
                    .get('.value')
                    .eq(0)
                    .then(($value) => {
                      removedValMOne = $value.text();
                      cy.get('.remove-filter-button')
                        .eq(0)
                        .click({ force: true });
                      cy.shopFilterButtonsDidTransition();
                      cy.shopProductsDidLoad();
                    });
                });
                it('unchecked the removed specification\'s checkbox button in the filter menu', () => {
                  cy.shopOpenFilterMenu(1);
                  cy.shopCheckboxIsNotChecked('@checkboxesM', removedValMOne);
                });
                it('is possible to check and uncheck each checkbox in the affected filter menu', () => {
                  cy.shopOpenFilterMenu(1);
                  cy.shopCheckboxesDoWork('@checkboxesM');
                });
                it('removed the filtered key\'s products from the product list', () => {
                  // the other filter is still applied
                  cy.shopProductsUlShouldNotAllContain(removedValMOne);
                });
                it('did not change product counts for the other filter keys in the "Manufacturing" category', () => {
                  cy.shopOpenFilterMenu(1);
                  cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
                });
                it('changes the shop product count according to the remaining filter', () => {
                  cy.get('.product-count')
                    .find('.figure')
                    .then(($figure) => {
                      expect(Number($figure.text())).to.eq(initialManufacturerFilterCounts[1]);
                    });
                });
                it('removed the query string from the address bar', () => {
                  // regex
                  cy.locationIsCorrect(`[^${removedValMOne}]`);
                });
                describe('the second filter is removed', () => {
                  beforeEach(() => {
                    cy.get('.remove-filter-button')
                      .eq(0)
                      .click({ force: true });
                    cy.shopFilterButtonsDidTransition();
                    cy.shopProductsDidLoad();
                  });
                  it('did not change product counts for the other filter keys in the "Manufacturing" category', () => {
                    cy.shopOpenFilterMenu(1);
                    cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
                  });
                  it('changes the shop product count back to its initial figure', () => {
                    cy.get('.product-count')
                      .find('.figure')
                      .then(($figure) => {
                        expect(Number($figure.text())).to.eq(initialProductCount);
                      });
                  });
                  it('removed all query strings from the address bar', () => {
                    cy.locationIsClean();
                  });
                });
              });
              it('does not change product counts for the other filter keys in the "Manufacturing" category', () => {
                cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
              });
            });
            describe('the "Storage capacity" filter menu is engaged', () => {
              let valueOneSC = '';
              let valueTwoSC = '';
              let filterKeySC = '';
              beforeEach(() => {
                cy.shopOpenAndSaveFilterMenu(4, 'SC');
                cy.get('.product-count')
                  .find('.figure')
                  .then(($figure) => {
                    initialProductCount = Number($figure.text());
                  });
                cy.get('@menuToggleSC')
                  .then(($label) => {
                    filterKeySC = $label.text();
                  });
                cy.get('@checkboxesSC')
                  .eq(0)
                  .then(($label) => {
                    valueOneSC = $label.text();
                  });
                cy.get('@checkboxesSC')
                  .eq(1)
                  .then(($label) => {
                    valueTwoSC = $label.text();
                  });
              });
              it('adds a filter upon submission', () => {
                cy.get('@checkboxesSC')
                  .eq(0)
                  .click({ force: true });
                cy.get('@submitButtonSC')
                  .click({ force: true });
                cy.shopProductsDidLoad();
              });
              describe('a filter is applied (1 "Storage capacity", 1 "Manufacturer")', () => {
                // should now be
                // Manufacturer: Apple, Storage capacity: 256gb
                let currentSCFilterCounts = [];
                beforeEach(() => {
                  cy.get('@checkboxesSC')
                    .eq(0)
                    .click({ force: true });
                  cy.get('@submitButtonSC')
                    .click({ force: true });
                  const newFilterCounts = [];
                  cy.get('@filterCountsSC')
                    .each(($count) => {
                      newFilterCounts.push(Number($count.text()));
                    }).then(() => {
                      currentSCFilterCounts = newFilterCounts;
                    });
                });
                it('does not gray out other checkbox buttons within the same filter category', () => {
                  cy.shopDidNotGrayCheckboxes('@checkboxesWrappersSC');
                });
                it('shows only products as indicated by the selected filters', () => {
                  cy.shopProductsUlShouldAllContainEitherCombo([valueOneM, valueOneSC], [valueOneM, valueTwoSC]);
                });
                it('does not uncheck the filter\'s checkbox after submission', () => {
                  cy.shopCheckboxIsChecked('@checkboxesSC', 0);
                });
                it('is still possible to check and uncheck each checkbox', () => {
                  cy.shopCheckboxesDoWork('@checkboxesSC');
                });
                it('changes the shop product count to the product count shown next to the chosen filter specification', () => {
                  cy.get('.product-count')
                    .find('.figure')
                    .should('contain', currentSCFilterCounts[0]);
                });
                it('handles search params correctly', () => {
                  // regex
                  cy.locationIsCorrect(`${filterKeyM}=${valueOneM}&${filterKeySC}=${valueOneSC}`);
                });
                describe('a second filter is applied (2 "Storage capacity", 1 "Manufacturer")', () => {
                  beforeEach(() => {
                    cy.get('@checkboxesSC')
                      .eq(1)
                      .click({ force: true });
                    cy.get('@submitButtonSC')
                      .click({ force: true });
                    const newFilterCounts = [];
                    cy.get('@filterCountsSC')
                      .each(($count) => {
                        newFilterCounts.push(Number($count.text()));
                      }).then(() => {
                        currentSCFilterCounts = newFilterCounts;
                      });
                  });
                  it('does not gray out other checkbox buttons within the same filter category', () => {
                    cy.shopDidNotGrayCheckboxes('@checkboxesWrappersSC');
                  });
                  it('shows only products as indicated by the selected filters', () => {
                    cy.shopProductsUlShouldAllContainEitherCombo([valueOneM, valueOneSC]);
                  });
                  it('does not uncheck the filter\'s checkbox after submission', () => {
                    cy.shopCheckboxIsChecked('@checkboxesSC', 1);
                  });
                  it('is still possible to check and uncheck each checkbox', () => {
                    cy.shopCheckboxesDoWork('@checkboxesSC');
                  });
                  it('changes the shop product count to the product count shown next to the chosen filtered specification', () => {
                    cy.get('.product-count')
                      .find('.figure')
                      .should('contain', currentSCFilterCounts[0] + currentSCFilterCounts[1]);
                  });
                  it('handles search params correctly', () => {
                    // regex
                    cy.locationIsCorrect(`${filterKeyM}=${valueOneM}&${filterKeySC}=(${valueOneSC}|${valueTwoSC})%7C(${valueOneSC}|${valueTwoSC})`);
                  });
                  it('changes the shop product count to the product count shown next to the chosen filtered specification', () => {
                    cy.get('.product-count')
                      .find('.figure')
                      .should('contain', currentSCFilterCounts[0]);
                  });
                });
              });
            });
          });
        });
        describe('checking filter menu product counts', () => {
          beforeEach(() => {
            cy.shopApplyFilterByIndeces(4, [0, 1]);
            cy.shopOpenFilterMenu(1);
          });
          it('refines product counts for each specification upon application of filters from other filter menus', () => {
            cy.shopFilterMenuCountsDidChange(initialManufacturerFilterCounts, '@filterCountsM');
          });
          describe('re-opening and applying a new filter in the first filter menu', () => {
            beforeEach(() => {
              const arr = [];
              cy.get('@filterCountsM')
                .each(($count) => {
                  arr.push(Number($count.text()));
                  initialManufacturerFilterCounts = arr;
                });
              cy.get('@checkboxesM')
                .eq(1)
                .click({ force: true });
              cy.get('@submitButtonM')
                .click({ force: true });
            });
            it('does not refine product counts', () => {
              cy.shopFilterMenuCountsDidNotChange(initialManufacturerFilterCounts, '@filterCountsM');
              // can't use initial counts here
            });
          });
        });
      });
      it('fetches more products upon clicking "Load more"', () => {
        cy.get('.next-page-button')
          .click({ force: true });
        cy.get('.shop-products-ul')
          .children()
          .should('have.length', productsPerPage * 2);
      });
      describe('the next page of products is loaded', () => {
        beforeEach(() => {
          cy.get('.next-page-button')
            .click({ force: true });
          cy.shopProductsDidLoad();
        });
        it('maintains the amount of products the user had loaded when they change sorting', () => {
          cy.shopOpenSortingDropdown();
          cy.shopSortByRatingWorkedCorrectly();
          cy.get('.shop-products-ul')
            .children()
            .should('have.length', productsPerPage * 2);
        });
        it('resets shop products back to 15 upon a filter change', () => {
          cy.shopApplyFilterByIndeces(1, [0, 1]);
          cy.get('.shop-products-ul')
            .children()
            .should('have.length', productsPerPage);
        });
      });
      describe('filters are applied through search params', () => {
        let filterKeyM = '';
        let valueOneM = '';
        let valueTwoM = '';
        let filterKeySC = '';
        let valueOneSC = '';
        beforeEach(() => {
          cy.shopOpenAndSaveFilterMenu(4, 'SC');
          cy.get('@menuToggleSC')
            .then(($label) => {
              filterKeySC = $label.text();
            });
          cy.get('@checkboxesSC')
            .eq(0)
            .then(($label) => {
              valueOneSC = $label.text();
            });
          cy.shopOpenAndSaveFilterMenu(1, 'M');
          cy.get('@menuToggleM')
            .then(($label) => {
              filterKeyM = $label.text();
            });
          cy.get('@checkboxesM')
            .eq(0)
            .then(($label) => {
              valueOneM = $label.text();
            });
          cy.get('@checkboxesM')
            .eq(1)
            .then(($label) => {
              valueTwoM = $label.text();
            });
        });
        it('applies a filter from address bar search params', () => {
          cy.visit(`${clientUrl}/shop?manufacturer=apple`);
          cy.shopProductsDidLoad();
        });
        describe('a single filter is applied', () => {
          beforeEach(() => {
            cy.visit(`${clientUrl}/shop?${filterKeyM}=${valueOneM}`);
            cy.shopProductsDidLoad();
            cy.shopOpenFilterMenu(1);
          });
          it('shows only products according to the selected filter', () => {
            cy.shopProductsUlShouldAllContain(valueOneM);
          });
          it('can be removed via red remove filter buttons', () => {
            cy.get('.remove-filter-button')
              .eq(0)
              .click({ force: true });
            cy.shopFilterButtonsDidTransition();
            cy.shopProductsDidLoad();
          });
          describe(('the "Manufacturers" filter menu is engaged'), () => {
            beforeEach(() => {
            });
            it('contains a checked checkbox from the search params-added filter', () => {
              cy.shopCheckboxIsChecked('@checkboxesM', 0);
            });
            it('did not check the other checkboxs', () => {
              cy.shopCheckboxIsNotChecked('@checkboxesM', 1);
              cy.shopCheckboxIsNotChecked('@checkboxesM', 2);
            });
            it('will add a filter through the interface', () => {
              cy.get('@checkboxesM')
                .eq(1)
                .click({ force: true });
              cy.get('@submitButtonM')
                .click({ force: true });
              cy.shopProductsDidLoad();
            });
            describe('user added a filter via the interface', () => {
              beforeEach(() => {
                cy.get('@checkboxesM')
                  .eq(1)
                  .click({ force: true });
                cy.get('@submitButtonM')
                  .click({ force: true });
                cy.shopProductsDidLoad();
              });
              it('checked the filter\'s checkbox', () => {
                cy.shopCheckboxIsChecked('@checkboxesM', 1);
              });
              it('handles search params/location correctly', () => {
              // regex
                cy.locationIsCorrect('manufacturer=apple|samsung');
              });
              it('shows only products according to the selected filter', () => {
                cy.shopProductsUlShouldAllContainEither([valueOneM, valueTwoM]);
              });
              it('can be removed by unchecking and submitting its checkbox', () => {
                cy.get('@checkboxesM')
                  .eq(1)
                  .click({ force: true });
                cy.get('@submitButtonM')
                  .click({ force: true });
                cy.shopProductsDidLoad();
              });
              describe('user removed the filter they added', () => {
                beforeEach(() => {
                  cy.get('@checkboxesM')
                    .eq(1)
                    .click({ force: true });
                  cy.get('@submitButtonM')
                    .click({ force: true });
                  cy.shopProductsDidLoad();
                });
                it('unchecked the filter\'s checkbox', () => {
                  cy.shopCheckboxIsNotChecked('@checkboxesM', 1);
                });
                it('handles search params/location correctly', () => {
                // regex
                  cy.locationIsCorrect('manufacturer=apple');
                });
                it('shows only products according to the first filter', () => {
                  cy.shopProductsUlShouldAllContain(valueOneM);
                });
              });
            });
          });
        });
        it('applies multiple filters from address bar search params', () => {
          cy.visit(`${clientUrl}/shop?${filterKeyM}=${valueOneM}%7C${valueTwoM}`);
          cy.shopProductsDidLoad();
          cy.get('.remove-filter-button')
            .should('have.length', 2);
          cy.get('.product-count')
            .find('.figure')
            .should('not.eq', initialProductCount);
          cy.shopProductsUlShouldAllContainEither(['Apple', 'Samsung']);
        });
        it('applies multiple filters from multiple categories from address bar search params', () => {
          cy.visit(`${clientUrl}/shop?${filterKeyM}=${valueOneM}|${valueTwoM}&${filterKeySC}=${valueOneSC}`);
          cy.shopProductsDidLoad();
          cy.get('.remove-filter-button')
            .should('have.length', 3);
        });
        describe('there are multiple filters from address bar search params', () => {
          beforeEach(() => {
            cy.visit(`${clientUrl}/shop?manufacturer=samsung%7Capple&storage%20capacity=256gb`);
          });
          it('shows only products as indicated by the selected filters', () => {
            cy.shopProductsUlShouldAllContainEitherCombo([[valueOneM, valueOneSC], [valueTwoM, valueOneSC]]);
          });
        });
      });
    });
    describe('on /register', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/register`);
      });
      it('navigates back and forth between /login and /registration upon clicking the lower link', () => {
        cy.get('.switch-link').click();
        cy.url()
          .should('include', '/login');
        cy.get('.switch-link').click();
        cy.url()
          .should('include', '/register');
      });
      it('will not process registration if fields are incomplete', () => {
        cy.get('#email-field')
          .type('adbc1234@gmail.com', { force: true });
        cy.get('#password-field')
          .type('defg5678', { force: true });
        cy.get('#confirm-password-field')
          .type('defg5678', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please complete required fields');
      });
      it('will not process registration if the email format is invalid', () => {
        cy.get('#username-field')
          .type('adbc12ail', { force: true });
        cy.get('#email-field')
          .type('adbc12ail.com', { force: true });
        cy.get('#password-field')
          .type('defg5678', { force: true });
        cy.get('#confirm-password-field')
          .type('defg5678', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Invalid email format');
      });
      it('will not process registration if password is too short', () => {
        cy.get('#username-field')
          .type('tester', { force: true });
        cy.get('#email-field')
          .type('tester@deviceshop.com', { force: true });
        cy.get('#password-field')
          .type('pass', { force: true });
        cy.get('#confirm-password-field')
          .type('pass', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please choose a password between 6 and 256 characters');
      });
      it('processes valid registration form', () => {
        cy.enterValidRegistrationForm();
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('You registered successfully');
      });
      it('will not process registration if the email is already taken', () => {
        cy.get('#username-field')
          .type('tester', { force: true });
        cy.get('#email-field')
          .type('userwithorders@deviceshop.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#confirm-password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Account with that email already exists');
      });
    });
    describe('on /login', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/login`);
      });
      it('communicates if a user with the indicated email was not found', () => {
        cy.get('#email-field')
          .type('userxz@deviceshop.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'Invalid credentials')
          .should('have.class', 'red');
      });
      it('communicates if a user entered an incorrect password', () => {
        cy.get('#email-field')
          .type('admin@deviceshop.com', { force: true });
        cy.get('#password-field')
          .type('userPasxword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'password')
          .should('have.class', 'red');
      });
      it('processes valid login form with correct credentials', () => {
        cy.get('#email-field')
          .type('admin@deviceshop.com', { force: true });
        cy.get('#password-field')
          .type('password', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('You logged in successfully');
      });
      it('will not process login if fields are incomplete', () => {
        cy.get('#email-field')
          .type('adbc1234@gmail.com', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please complete required fields');
      });
    });
    describe('on a shop product\'s page', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/shop/apple-iphone-256gb-ios-16-5g-smartphone-1`);
        cy.get('#shop-product-page')
          .should('not.have.class', 'loading');
      });
      describe('interacting with the slider', () => {
        it('properly navigates back and forth through the slides, showing and hiding the buttons when appropriate', () => {
          cy.wait(2750);
          cy.get('.angle-button-prev')
            .should('not.exist');
          for (let i = 1; i <= 4; i += 1) {
            cy.get('.angle-button-next').click({ force: true });
            cy.get('.dots')
              .get('.dot')
              .eq(i)
              .should('have.class', 'active');
            cy.wait(2750);
          }
          cy.get('.angle-button-next')
            .should('not.exist');
          for (let i = 3; i >= 0; i -= 1) {
            cy.get('.angle-button-prev').click({ force: true });
            cy.get('.dots')
              .get('.dot')
              .eq(i)
              .should('have.class', 'active');
            if (i > 0) cy.wait(2750);
          }
          cy.get('.angle-button-prev')
            .should('not.exist');
        });
      });
      it('specifications are categorized with the first column being "General information" followed "Key specifications"', () => {
        cy.get('.specifications')
          .get('.category')
          .as('theCategories');
        cy.get('@theCategories')
          .eq(0)
          .get('.name')
          .should('contain', 'General information');
        cy.get('@theCategories')
          .eq(1)
          .get('.name')
          .should('contain', 'Key specifications');
      });
      it('displays more reviews upon clicking the load button', () => {
        cy.get('.reviews')
          .get('.reviews-ul')
          .children()
          .then((reviews) => {
            const initialLength = reviews.length;
            cy.get('.reviews')
              .get('.next-page-button')
              .click({ force: true });
            cy.get('.reviews')
              .get('.reviews-ul')
              .children()
              .should('have.length.above', initialLength);
          });
      });
      describe('all reviews are loaded', () => {
        let reviewsLength = 0;
        let fullStars = 0;
        let halfStars = 0;
        beforeEach(() => {
          const openAllReviews = () => {
            cy.get('.next-page-button')
              .click({ force: true })
              .then(() => {
                cy.get('.next-page-button')
                  .then((button) => {
                    if (button.hasClass('limit-reached')) {
                      cy.get('.reviews-ul')
                        .children()
                        .then((reviews) => {
                          reviewsLength = reviews.length;
                          if (reviews.find('.full-star').length > 0) {
                            cy.get('.reviews')
                              .find('.full-star')
                              .then((stars) => {
                                for (let s = 0; s < stars.length; s += 1) {
                                  fullStars += 1;
                                }
                              });
                          }
                          if (reviews.find('.half-star').length > 0) {
                            cy.get('.reviews')
                              .find('.half-star')
                              .then((stars) => {
                                for (let s = 0; s < stars.length; s += 1) {
                                  halfStars += 1;
                                }
                              });
                          }
                        });
                    } else {
                      cy.wait(100);
                      openAllReviews();
                    }
                  });
              });
          };
          openAllReviews();
        });
        it('has a computed rating accurate to the graphic stars rendered', () => {
          cy.get('.rating-badge')
            .get('.rating')
            .should('contain', ((fullStars + halfStars) / reviewsLength).toString());
        });
      });
      it('processes an add item request upon clicking "Add to cart"', () => {
        cy.shopProductPageAddToCart();
        cy.get('.cart-link')
          .should('contain.text', '(1)');
        cy.reload();
      });
      describe('an item was added to the user\'s cart', () => {
        beforeEach(() => {
          cy.shopProductPageAddToCart();
        });
        it('updates the user\'s cart count in the navbar', () => {
          cy.get('.cart-link')
            .should('contain.text', '(1)');
        });
        it('retrieves the added item from the guest\'s local storage upon reloading the page', () => {
          cy.reload();
          cy.get('.cart-link')
            .should('contain.text', '(1)');
        });
        it('is possible to add a second item to the guest cart', () => {
          cy.shopProductPageAddSecondItem();
        });
        describe('a second item is added to the user\'s cart', () => {
          beforeEach(() => {
            cy.shopProductPageAddSecondItem();
          });
          it('displays an accurate cart item count', () => {
            cy.get('.cart-link')
              .should('contain.text', '(2)');
          });
          it('retrieves both added items from the guest\'s local storage upon reloading the page', () => {
            cy.reload();
            cy.get('.cart-link')
              .should('contain.text', '(2)');
          });
          describe('on /cart', () => {
            beforeEach(() => {
              cy.visit(`${clientUrl}/cart`);
            });
            it('one or both added items can be removed', () => {
              cy.cartOneOrBothAddedItemsCanBeRemoved();
            });
            describe('the "Extend warranty" modal is open', () => {
              beforeEach(() => {
                cy.cartOpenWarrantyModal();
              });
              it('functions as expected while toggling through each option', () => {
                cy.cartAddonButtonsFunctionAsExpectedWhileToggling();
              });
              describe('a warranty addon has been added to the first cart item', () => {
                beforeEach(() => {
                  cy.cartAddAddon();
                });
                it('can be removed via the "Remove plan" button', () => {
                  cy.cartTestRemovePlanButton();
                });
                describe('the insurance modal is open', () => {
                  beforeEach(() => {
                    cy.cartOpenInsuranceModal();
                  });
                  it('functions as expected while toggling through each option', () => {
                    cy.cartAddonButtonsFunctionAsExpectedWhileToggling();
                  });
                  describe('an insurance addon was added', () => {
                    beforeEach(() => {
                      cy.cartAddInsurance();
                    });
                    it('does not replace the warranty addon', () => {
                      cy.cartWarrantyNotReplaced();
                    });
                  });
                });
              });
            });
            it('takes the user to a registration prompt if the checkout link is clicked', () => {
              cy.get('.checkout')
                .find('.checkout-link')
                .click();
              cy.contains('To continue placing your order, please register an account');
            });
          });
        });
      });
    });
  });
  describe('as a registered user', () => {
    describe('with cart items', () => {
      beforeEach(() => {
        cy.postLogin('userwithcartitemsandsavedaddresses@deviceshop.com', 'password');
        cy.visit(`${clientUrl}`);
      });
      describe('on /cart', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/${CART_ROUTE}`);
        });
        it('one or both added items can be removed', () => {
          cy.cartOneOrBothAddedItemsCanBeRemoved();
        });
        describe('the "Extend warranty" modal is open', () => {
          beforeEach(() => {
            cy.cartOpenWarrantyModal();
          });
          it('functions as expected while toggling through each option', () => {
            cy.cartAddonButtonsFunctionAsExpectedWhileToggling();
          });
          describe('a warranty addon has been added to the first cart item', () => {
            beforeEach(() => {
              cy.cartAddAddon();
            });
            it('can be removed via the "Remove plan" button', () => {
              cy.cartTestRemovePlanButton();
            });
            describe('the insurance modal is open', () => {
              beforeEach(() => {
                cy.cartOpenInsuranceModal();
              });
              it('functions as expected while toggling through each option', () => {
                cy.cartAddonButtonsFunctionAsExpectedWhileToggling();
              });
              describe('an insurance addon was added', () => {
                beforeEach(() => {
                  cy.cartAddInsurance();
                });
                it('does not replace the warranty addon', () => {
                  cy.cartWarrantyNotReplaced();
                });
              });
            });
          });
        });
      });
      describe('on /checkout', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/${CART_ROUTE}/${CHECKOUT_ROUTE}`);
        });
        it('can change the shipping method', () => {
          cy.checkoutSelectShippingMethod(0);
          cy.get('.order-item.shipping')
            .find('.price')
            .then((firstPrice) => {
              expect(firstPrice).to.not.contain.text('Select shipping below');
              cy.checkoutSelectShippingMethod(1);
              cy.get('.order-item.shipping')
                .find('.price')
                .should('not.eq', firstPrice);
            });
        });
        it('initializes with a user\'s default delivery address selected', () => {
          cy.get('.shipping-fields')
            .find('#firstName')
            .should('have.value', 'Emmanuella');
          cy.get('.shipping-fields')
            .find('#lastName')
            .should('have.value', 'Pedro');
        });
        it('toggles through a user\'s saved delivery addresses', () => {
          cy.get('.address-dropdown.toggle')
            .should('not.have.class', 'loading')
            .as('theMenu')
            .click();
          cy.get('.items.shown')
            .find('.callback-button')
            .as('theButtons')
            .eq(0)
            .click();
          cy.get('.shipping-fields')
            .find('#addressLineOne')
            .should('have.value', '8 Circle Street');
          cy.wait(222);
          cy.get('@theMenu')
            .click();
          cy.get('@theButtons')
            .eq(1)
            .click();
          cy.get('.shipping-fields')
            .find('#addressLineOne')
            .should('have.value', '68 Roosevelt Dr.');
        });
        it('toggles between the form for company addresses and private addresses via the buttons', () => {
          cy.get('.border-buttons-row')
            .children()
            .as('theButtons')
            .eq(1)
            .click();
          cy.get('.address-form')
            .find('.labeled-input')
            .eq(0)
            .find('.label')
            .as('theLabel')
            .should('contain.text', 'Company name');
          cy.get('@theButtons')
            .eq(0)
            .click();
          cy.get('@theLabel')
            .should('contain.text', 'First name');
        });
        describe('reviewing the cart items list', () => {
          let countedTotal = 0;
          let initialDisplayedTotal = 0;
          beforeEach(() => {
            cy.get('.order-items-ul')
              .find('.order-item')
              .each((orderItem) => {
                if (orderItem.hasClass('shipping') || orderItem.hasClass('total')) {
                  return;
                }
                let price = orderItem.find('.price').text();
                price = price.substring(1);
                price = Number(price) * 100;
                countedTotal += price;
              });
            cy.get('.order-item.total')
              .find('.price')
              .then((totalSpan) => {
                const total = totalSpan.text().substring(1);
                initialDisplayedTotal = Number(total) * 100;
              });
          });
          it('has the same total as the sum of its listed items', () => {
            expect(countedTotal).to.equal(initialDisplayedTotal);
          });
          it('updates the total accurately according to the shipping method selected', () => {
            cy.get('.shipping-fields')
              .find('.labeled-radio-button')
              .eq(0)
              .get('.label')
              .then((label) => {
                const shippingPrice = Number(label.text().match(/(?<=\$)\d+\.\d+/)[0]) * 100;
                cy.checkoutSelectShippingMethod(0);
                cy.get('.order-item.total')
                  .find('.price')
                  .then((totalSpan) => {
                    let newTotal = totalSpan.text().substring(1);
                    newTotal = Number(newTotal) * 100;
                    expect(newTotal).to.equal(initialDisplayedTotal + shippingPrice);
                  });
              });
          });
        });
        describe('the payment fields are engaged', () => {
          it('will block submission of an incomplete form on account of various conditions of incompleteness', () => {
            cy.get('.shipping-fields')
              .find('#addressLineOne')
              .as('theAddressField')
              .clear();
            cy.checkoutSubmitForm();
            cy.hasWarningBorder(cy.get('@theAddressField').parent());
            cy.get('.shipping-fields')
              .find('.labeled-radio-button')
              .eq(0)
              .as('theShippingMethod');
            cy.hasWarningBorder(cy.get('@theShippingMethod'));
            cy.get('.payment-fields')
              .find('.labeled-radio-button')
              .eq(0)
              .as('thePaymentMethod');
            cy.hasWarningBorder(cy.get('@thePaymentMethod'));
            cy.get('.payment-fields')
              .find('#cardNumber')
              .as('theCardNumberField');
            cy.hasWarningBorder(cy.get('@theCardNumberField').parent());
            cy.get('@theAddressField')
              .type('3355 Connecticut Avenue NW #202');
            cy.hasNoWarningBorder(cy.get('@theAddressField').parent());
            cy.checkoutSelectShippingMethod(0);
            cy.hasNoWarningBorder(cy.get('@theShippingMethod').parent());
            cy.checkoutSubmitForm();
            cy.hasWarningBorder(cy.get('@thePaymentMethod'));
            cy.hasNoWarningBorder(cy.get('@theShippingMethod'));
            cy.get('@theAddressField')
              .should('not.have.class', 'warn');
            cy.hasNoWarningBorder(cy.get('@theAddressField').parent());
            cy.checkoutSelectPaymentMethod(0);
            cy.checkoutFillPaymentFields();
            cy.get('@theAddressField')
              .clear();
            cy.checkoutSubmitForm();
            cy.get('.notification')
              .should('contain.text', 'Please complete all required shipping fields');
            cy.hasWarningBorder(cy.get('@theAddressField').parent());
          });
          describe('the form is complete', () => {
            beforeEach(() => {
              cy.checkoutSelectShippingMethod(0);
              cy.checkoutSelectPaymentMethod(0);
              cy.checkoutFillPaymentFields();
            });
            it('successfully processes a complete form', () => {
              cy.checkoutSubmitForm();
              cy.contains('Your order was placed successfully');
            });
          });
        });
      });
      describe('on /account/addresses', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/account/addresses`);
        });
        describe('using the "Add an address" form', () => {
          beforeEach(() => {
            cy.get('.border-buttons-row')
              .children()
              .eq(0)
              .click();
          });
          it('creates addresses', () => {
            cy.addressesFillForm();
            cy.get('.submit-button')
              .click();
            cy.get('.border-buttons-row')
              .eq(0)
              .children()
              .eq(1)
              .click();
            cy.get('.address-dropdown.toggle')
              .click();
            cy.get('.items.shown')
              .should('contain.text', '4326 Wisconsin Avenue');
          });
          it('creates a default address', () => {
            cy.addressesFillForm();
            cy.get('.labeled-checkbox-button.default-checkbox')
              .click();
            cy.get('.submit-button')
              .click();
            cy.contains('Address saved to address book');
            cy.visit(`${clientUrl}/${CART_ROUTE}/${CHECKOUT_ROUTE}`);
            cy.get('.shipping-fields')
              .find('#addressLineOne')
              .should('have.value', '4326 Wisconsin Avenue');
          });
        });
        describe('using the "Edit an address" form', () => {
          beforeEach(() => {
            cy.get('.border-buttons-row')
              .children()
              .eq(1)
              .click();
          });
          it('initializes with the default delivery address selected', () => {
            cy.get('.labeled-checkbox-button.default-checkbox')
              .find('#makeDefault')
              .should('contain.value', 'true');
            cy.addressesSelectAddress(0);
            cy.addressesIsNotDefaultAddress();
          });
          it('can update fields in a user\'s address', () => {
            cy.get('#addressLineOne')
              .clear()
              .type('4326 Wisconsin Avenue');
            cy.get('.submit-button')
              .click();
            cy.get('.notification')
              .contains('Address updated');
          });
          it('can set the user\'s default address', () => {
            cy.addressesSelectAddress(0);
            cy.get('.labeled-checkbox-button.default-checkbox')
              .click();
            cy.get('.submit-button')
              .click();
            cy.get('.notification')
              .contains('Address updated');
            cy.visit(`${clientUrl}/${CART_ROUTE}/${CHECKOUT_ROUTE}`);
            cy.get('.shipping-fields')
              .find('#addressLineOne')
              .should('have.value', '8 Circle Street');
          });
        });
      });
    });
    describe('with orders', () => {
      beforeEach(() => {
        cy.postLogin('userwithcartitemsandordersandreviews@deviceshop.com', 'password');
      });
      describe('on account/orders', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/account/orders`);
        });
        it('can send an order cancellation request', () => {
          cy.get('.order')
            .eq(0)
            .as('theOrder')
            .find('.buttons-row')
            .then((buttonsRow) => {
              if (buttonsRow.hasClass('blocked')) {
                cy.get('.order')
                  .eq(1)
                  .as('theOrder');
              }
              cy.get('@theOrder')
                .find('.cancel-order-button')
                .click();
              cy.get('.modal.show')
                .find('.labeled-radio-button')
                .eq(1)
                .click();
              cy.get('.modal.show')
                .find('.submit-button')
                .click();
              cy.get('@theOrder')
                .find('.col.status')
                .find('.value')
                .should('have.text', CANCELLATION_REQUESTED);
            });
        });
      });
      describe('on account/credentials', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/account/credentials`);
        });
        it('can change an account\'s first name, last name and phone number', () => {
          cy.credentialsChangeFieldTo(1, 'Daniel');
          cy.credentialsChangeFieldTo(2, 'Rahill');
          cy.credentialsChangeFieldTo(4, '292-308-3074');
        });
        it('can change an account\'s password', () => {
          cy.get('.field')
            .eq(3)
            .find('.button')
            .click();
          cy.get('.modal.show')
            .find('#new-value')
            .clear()
            .type('newPassword');
          cy.get('.modal.show')
            .find('#confirm-password')
            .clear()
            .type('newPassword');
          cy.get('.modal.show')
            .find('.submit-button')
            .click();
          cy.contains('Field updated');
          cy.visit(`${clientUrl}/${LOGOUT_ROUTE}`);
          cy.contains('You logged out of your account');
          cy.visit(`${clientUrl}/${LOGIN_ROUTE}`);
          cy.get('#email-field')
            .type('userwithcartitemsandordersandreviews@deviceshop.com');
          cy.get('#password-field')
            .type('newPassword');
          cy.get('#submit-button')
            .click({ force: true });
          cy.contains('You logged in successfully');
        });
        it('can change an account\'s avatar', () => {
          cy.get('.field')
            .eq(0)
            .find('.button')
            .click();
          cy.get('.modal.show')
            .find('input[type="file"]')
            .selectFile('cypress/fixtures/fixture-1.png', { force: true });
          cy.get('.modal.show')
            .find('.submit-button')
            .click({ force: true });
          cy.get('.modal.show')
            .contains('Your avatar was changed');
        });
      });
    });
  });
  describe('as a user eligible to leave reviews', () => {
    beforeEach(() => {
      cy.postLogin('userwhocanwritereviews@deviceshop.com', 'password');
    });
    describe('on the first shop product\'s page', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/shop/samsung-galaxy-256gb-android-11-5g-smartphone-2`);
      });
      it('displays a notification indicating the user can leave a review', () => {
        cy.get('.leave-a-rating.show')
          .should('exist');
      });
      describe('the review modal is open', () => {
        beforeEach(() => {
          cy.get('.leave-a-rating')
            .find('button')
            .click();
        });
        it('handles rating selection properly via the star buttons', () => {
          cy.reviewGetStar(3)
            .click({ force: true });
          cy.reviewGetStar(4)
            .find('svg')
            .should('have.class', 'empty-star');
        });
        it('handles form submission properly across multiple pages', () => {
          cy.get('.submit-button')
            .click();
          cy.contains('Your rating was submitted');
          cy.reload();
          cy.get('.top-info-row')
            .find('.rating')
            .contains('5');
          cy.visit(`${clientUrl}/shop/apple-iphone-256gb-ios-16-5g-smartphone-1`);
          cy.get('.leave-a-rating')
            .find('button')
            .click();
          cy.reviewGetStar(3)
            .click({ force: true });
          cy.get('.submit-button')
            .click();
          cy.wait(4000);
          cy.reload();
          cy.reviewCheckRating('4.80');
        });
        describe('a review has been posted', () => {
          beforeEach(() => {
            cy.get('.submit-button')
              .click();
          });
          describe('on account/orders', () => {
            beforeEach(() => {
              cy.visit(`${clientUrl}/account/orders`);
            });
            it('displays a \"Review\" button for the product which has not been reviewed and a \"Change\" button for the product which was reviewed', () => {
              let foundReview = false;
              let foundChange = false;
              cy.get('.show-review-modal-button')
                .each((button) => {
                  const text = button.text();
                  if (text === 'Review') {
                    foundReview = true;
                  }
                  if (text === 'Change') {
                    foundChange = true;
                  }
                }).then(() => {
                  expect(foundReview).to.be.true;
                  expect(foundChange).to.be.true;
                });
            });
            describe('the edit review modal is opened', () => {
              beforeEach(() => {
                cy.get('.show-review-modal-button')
                  .each((button) => {
                    const text = button.text();
                    if (text === 'Change') {
                      button.trigger('click');
                    }
                  });
              });
              it('handles updating the rating', () => {
                cy.reviewGetStar(3)
                  .click({ force: true });
                cy.get('.modal.show')
                  .find('.submit-button')
                  .click();
                cy.visit(`${clientUrl}/shop/samsung-galaxy-256gb-android-11-5g-smartphone-2`);
                cy.reviewCheckRating('4.00');
              });
            });
          });
        });
      });
    });
    describe('on account/orders', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/account/orders`);
        cy.get('#name')
          .should('contain.value', 'Product name');
      });
    });
  });
  describe('as an admin', () => {
    beforeEach(() => {
      cy.postLogin('admin@deviceshop.com', 'password');
    });
    describe('on admin/orders', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/orders`);
      });
      it('can fetch specific orders by typing their id\'s in the searchbox', () => {
        cy.get('.order')
          .eq(1)
          .find('.id')
          .then((searchedId) => {
            const searchTerm = searchedId.text().slice(0, 4);
            cy.get('.main-col')
              .find('.searchbox')
              .find('input')
              .type(searchTerm);
            cy.adminSearchboxLoaded();
            cy.get('.order')
              .find('.id')
              .should('contain.text', searchedId.text());
          });
      });
      it('should be ordered by status: Processing, Delivered, Canceled', () => {
        cy.adminOrderIsProcessing(0);
        cy.adminOrderIsDelivered(1);
        cy.adminOrderIsDelivered(2);
        cy.adminOrderIsDelivered(3);
        cy.adminOrderIsDelivered(4);
        cy.adminOrderIsCanceled(6);
      });
      it('updates status changes accordingly', () => {
        cy.adminChangeOrderStatus(0, 0);
        cy.adminOrderIsShipped(0);
        cy.adminChangeOrderStatus(0, 1);
        cy.adminOrderIsDelivered(0);
      });
      describe('on admin/orders/unshipped', () => {
        beforeEach(() => {
          cy.get('.filter-link')
            .eq(1)
            .click();
        });
        it('shows only "Processing" orders', () => {
          cy.get('.status.col .value')
            .each((statusValue) => {
              expect(statusValue).to.have.text(PROCESSING);
            });
        });
        it('does not display "Canceled" orders', () => {
          cy.get('.status.col .value')
            .each((statusValue) => {
              expect(statusValue).to.not.have.text(CANCELED);
            });
        });
      });
    });
    describe('on admin/shopproducts', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/shopproducts`);
      });
      describe('using the searchbar', () => {
        it('fetches and renders results', () => {
          cy.get('.main-col')
            .find('.searchbox')
            .find('input')
            .type('s');
          cy.adminSearchboxLoaded();
          cy.get('.search-results-ul')
            .find('li')
            .should('have.length.greaterThan', 2);
        });
        it('fetches and renders only Samsung or Apple products upon respective input', () => {
          cy.adminTestSearchboxInput('samsung');
          cy.adminTestSearchboxInput('apple');
        });
        it('fetches and renders only 128GB or 256GB products upon respective input', () => {
          cy.adminTestSearchboxInput('256');
          cy.adminTestSearchboxInput('128');
        });
        it('fetches and renders only 128GB Samsung, 128GB Apple, 256GB Samsung or 256GB Apple products upon respective input ', () => {
          cy.adminTestSearchboxInput('samsung 256');
          cy.adminTestSearchboxInput('samsung 128');
          cy.adminTestSearchboxInput('apple 256');
          cy.adminTestSearchboxInput('apple 128');
        });
        it('renders a "no results" item if no results were fetched', () => {
          cy.get('.main-col')
            .find('.searchbox')
            .find('input')
            .type('asdfc');
          cy.adminSearchboxLoaded();
          cy.get('.main-col')
            .find('.search-results-ul')
            .contains('No results');
        });
        describe('on the second page of search results', () => {
          beforeEach(() => {
            cy.get('.arrow-button.forward')
              .click();
          });
          it('returns the user to page 1 after entering input which returns only enough results to support a maximum page of one', () => {
            cy.get('.main-col')
              .find('.searchbox')
              .find('input')
              .type('samsung');
            cy.adminSearchboxLoaded();
            cy.get('.number-button.current-page')
              .should('contain.text', '1');
          });
          describe('on the third page of search results', () => {
            beforeEach(() => {
              cy.get('.arrow-button.forward')
                .click();
            });
            it('returns the user to page 2 after entering input which returns only enough results to support a maximum page of two', () => {
              cy.get('.main-col')
                .find('.searchbox')
                .find('input')
                .type('apple');
              cy.adminSearchboxLoaded();
              cy.get('.number-button.current-page')
                .should('contain.text', '2');
            });
          });
        });
      });
      it('moves a shop product to the recycling bin via the deletion modal', () => {
        cy.adminSearchboxLoaded();
        cy.get('.filter-link')
          .eq(1)
          .then((filterLink) => {
            const initialDeletedCount = filterLink.text().match(/\d/g)[0];
            cy.get('.search-result')
              .eq(2)
              .find('.name')
              .then((deletedProductName) => {
                cy.get('.search-result')
                  .eq(2)
                  .find('.icon-button.trash-icon')
                  .click();
                cy.get('.modal.show')
                  .find('.confirm-button')
                  .click();
                cy.get('.filter-link')
                  .eq(1)
                  .should('contain.text', String(Number(initialDeletedCount) + 1));
                cy.get('.filter-link')
                  .eq(1)
                  .click();
                cy.adminSearchboxLoaded();
                cy.contains(deletedProductName.text());
              });
          });
      });
      describe('on admin/shopproducts/deleted', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/admin/shopproducts/deleted`);
        });
        it('deletes items from the recycling bin', () => {
          cy.adminSearchboxLoaded();
          cy.get('.search-result')
            .eq(0)
            .find('.name')
            .then((deletedProductName) => {
              cy.get('.search-result')
                .eq(0)
                .find('.icon-button.trash-icon')
                .click();
              cy.get('.modal.show')
                .find('.confirm-button')
                .click();
              cy.should('not.contain', deletedProductName.text());
            });
        });
      });
    });
    describe('on /admin/shopproducts/create', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/shopproducts/create`);
      });
      describe('working with the slider', () => {
        beforeEach(() => {
          cy.get('.slider')
            .as('theSlider');
          cy.get('@theSlider')
            .get('.add-image-input')
            .as('theAddInput');
        });
        it('adds an image', () => {
          cy.get('@theAddInput')
            .selectFile('cypress/fixtures/fixture-1.png', { force: true });
          cy.get('.dot')
            .should('have.length', 1);
          cy.get('@theSlider')
            .find('img')
            .invoke('attr', 'src')
            .should('contain', 'blob');
        });
        describe('an image was added', () => {
          beforeEach(() => {
            cy.get('@theAddInput')
              .selectFile('cypress/fixtures/fixture-1.png', { force: true });
          });
          it('can be replaced', () => {
            cy.adminReplaceSliderImage('fixture-2.png');
          });
          it('updates the images form field counter accurately', () => {
            cy.get('.form-field.images')
              .find('input')
              .should('have.value', 1);
          });
          it('can add a second image', () => {
            cy.adminAddAndTestSliderImage('fixture-2.png');
          });
          describe('a second image was added', () => {
            beforeEach(() => {
              cy.adminAddAndTestSliderImage('fixture-2.png');
              cy.get('@theSlider')
                .find('.button.delete-image')
                .as('theDeleteButton');
            });
            it('can be deleted', () => {
              cy.adminDeleteSliderImage();
            });
            it('can delete the first image', () => {
              cy.sliderPrevClick();
              cy.adminDeleteSliderImage();
            });
            it('can be replaced', () => {
              cy.adminReplaceSliderImage('fixture-3.png');
            });
            it('can replace the first image', () => {
              cy.sliderPrevClick();
              cy.adminReplaceSliderImage('fixture-3.png');
            });
            it('updates the images form field counter accurately', () => {
              cy.get('.form-field.images')
                .find('input')
                .should('have.value', 2);
            });
          });
        });
      });
      it('changes the corresponding fields in the product preview pane upon changes to fields in the form overlay', () => {
        cy.get('#name')
          .clear()
          .type('new smartphone');
        cy.get('#namePreview')
          .should('contain.text', 'new smartphone');
        cy.get('#price')
          .clear()
          .type('800');
        cy.get('#pricePreview')
          .should('contain.text', '800');
        cy.get('#discount')
          .clear()
          .type('20');
        cy.get('#discountPreview')
          .should('contain.text', '20');
        cy.get('#stock')
          .clear()
          .type('5');
        cy.get('#stockPreview')
          .should('contain.text', '5');
        cy.get('#description')
          .clear()
          .type('smartphone description');
        cy.get('#descriptionPreview')
          .should('contain.text', 'smartphone description');
      });
      it('changes the corresponding fields in the form overlay upon changes to fields in the product preview pane', () => {
        cy.get('#namePreview')
          .clear()
          .type('new smartphone');
        cy.get('#name')
          .should('contain.value', 'new smartphone');
        cy.get('#pricePreview')
          .clear()
          .type('800');
        cy.get('#price')
          .should('contain.value', '800');
        cy.get('#discountPreview')
          .clear()
          .type('20');
        cy.get('#discount')
          .should('contain.value', '20');
        cy.get('#stockPreview')
          .clear()
          .type('5');
        cy.get('#stock')
          .should('contain.value', '5');
        cy.get('#descriptionPreview')
          .clear()
          .type('smartphone description');
        cy.get('#description')
          .should('contain.value', 'smartphone description');
      });
      it('changes the price and previews the calculated discounted price accurately upon inputs to relevant fields', () => {
        cy.get('#discountPreview')
          .click()
          .clear()
          .type('15');
        cy.adminCheckShopProductFormPrices();
        cy.get('#pricePreview')
          .click()
          .clear()
          .type('950');
        cy.adminCheckShopProductFormPrices();
        cy.get('#discount')
          .click()
          .clear()
          .type('23');
        cy.adminCheckShopProductFormPrices();
        cy.get('#price')
          .click()
          .clear()
          .type('678');
        cy.adminCheckShopProductFormPrices();
      });
      describe('working on the specifications section', () => {
        it('adds a new category upon click \'Add category\'', () => {
          cy.get('.add-category-button')
            .click();
          cy.get('.category')
            .should('contain.text', 'New specifications');
        });
        describe('a category was added', () => {
          beforeEach(() => {
            cy.get('.add-category-button')
              .click();
          });
          it('can be deleted', () => {
            cy.get('.category')
              .find('.delete-category-button')
              .click();
            cy.get('.category')
              .should('not.exist');
          });
          it('is deleted if its last specification is deleted', () => {
            cy.get('.category')
              .find('.delete-specification-button')
              .click();
            cy.get('.category')
              .should('not.exist');
          });
        });
        describe('another product\'s specifications are loaded', () => {
          beforeEach(() => {
            cy.adminFetchOtherSpecifications();
          });
          it('can delete categories and correctly output their next expected ordering', () => {
            let fourthCategory = '';
            cy.get('.category')
              .eq(3)
              .find('.name')
              .find('input')
              .then((input) => {
                fourthCategory = input.val();
                cy.get('.category')
                  .eq(2)
                  .find('.delete-category-button')
                  .click();
                cy.get('.category')
                  .eq(2)
                  .find('.name')
                  .find('input')
                  .should('have.value', fourthCategory);
              });
          });
        });
      });
      describe('dealing with form warnings', () => {
        beforeEach(() => {
          cy.get('#price')
            .clear();
          cy.adminSubmitShopProductForm();
        });
        it('warns if there is no name and clears the warning after input', () => {
          cy.get('#name')
            .parent()
            .as('theNameInputParent');
          cy.hasWarningBorder(cy.get('@theNameInputParent'));
          cy.adminProductFormFillName('new smartphone');
          cy.hasNoWarningBorder(cy.get('@theNameInputParent'));
        });
        it('warns if there is no price and clears the warning after input', () => {
          cy.get('#price')
            .parent()
            .as('thePriceInputParent');
          cy.hasWarningBorder(cy.get('@thePriceInputParent'));
          cy.adminProductFormFillPrice('1000');
          cy.hasNoWarningBorder(cy.get('@thePriceInputParent'));
        });
        it('warns if there are no images and clears the warning after input', () => {
          cy.get('#images')
            .parent()
            .as('theImagesInputParent');
          cy.hasWarningBorder(cy.get('@theImagesInputParent'));
          cy.adminAddSliderImage('fixture-3.png');
          cy.wait(100);
          cy.hasNoWarningBorder(cy.get('@theImagesInputParent'));
        });
        it('warns if there is no description and clears the warning after input', () => {
          cy.get('#description')
            .parent()
            .as('theDescriptionInputParent');
          cy.hasWarningBorder(cy.get('@theDescriptionInputParent'));
          cy.adminProductFormFillDescription('new smartphone');
          cy.hasNoWarningBorder(cy.get('@theDescriptionInputParent'));
        });
        it('warns if there is no type or brand and clears the warning after input', () => {
          cy.get('.form-submission-overlay')
            .find('.dropdown-field')
            .eq(0)
            .as('theBrandDropdown');
          cy.get('.form-submission-overlay')
            .find('.dropdown-field')
            .eq(1)
            .as('theTypeDropdown');
          cy.hasWarningBorder(cy.get('@theBrandDropdown'));
          cy.hasWarningBorder(cy.get('@theTypeDropdown'));
          cy.adminSelectBrandOrType(0, 0);
          cy.hasNoWarningBorder(cy.get('@theBrandDropdown'));
          cy.adminSelectBrandOrType(1, 0);
          cy.hasNoWarningBorder(cy.get('@theTypeDropdown'));
        });
      });
      it('submits the form and creates the product', () => {
        cy.adminFillAndSubmitProductForm();
        cy.get('.nav-to-page-button')
          .click();
        cy.contains('new smartphone');
        cy.contains('1000');
        cy.get('.categories-ul')
          .find('.category')
          .should('exist');
        cy.get('.categories-ul')
          .find('.specification')
          .should('exist');
      });
      describe('a product is created', () => {
        beforeEach(() => {
          cy.adminFillAndSubmitProductForm();
          cy.get('.modal.show')
            .find('.close-button')
            .click();
        });
        it('transitions the page into the update form which can update the new product accordingly', () => {
          cy.adminAddSliderImage('fixture-3.png');
          cy.adminProductFormFillPrice('967');
          cy.adminSubmitShopProductForm();
          cy.get('.notification')
            .should('exist');
          cy.visit(`${clientUrl}/shop/new-smartphone`);
          cy.contains('967');
          cy.get('.dot')
            .should('have.length', 2);
        });
      });
    });
    describe('on admin/shopproducts/edit/:title', () => {
      const product = 'apple-iphone-256gb-ios-16-5g-smartphone-1';
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/shopproducts/edit/${product}`);
        cy.adminSelectBrandOrType(0, 0);
        cy.adminSelectBrandOrType(1, 0);
      });
      it('can update the product images', () => {
        cy.get('.top-info-row')
          .find('.slider')
          .as('theSlider');
        cy.adminReplaceSliderImage('fixture-2.png');
        cy.adminAddSliderImage('fixture-1.png');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/admin/shopproducts/edit/${product}`);
        cy.get('.dot')
          .should('have.length', 6);
      });
      it('can update the product name', () => {
        cy.adminProductFormFillName('new smartphone');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/shop/new-smartphone`);
        cy.contains('new smartphone');
      });
      it('can update the product price', () => {
        cy.adminProductFormFillPrice('1200');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/shop/${product}`);
        cy.contains('1200');
      });
      it('can update the product discount', () => {
        cy.adminProductFormFillDiscount('30');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/shop/${product}`);
        cy.get('.discount-tag')
          .should('contain.text', '30');
        cy.get('.discount-tag')
          .then((discountTag) => {
            const discountNum = Number(discountTag.text().match(/\d+/));
            cy.get('.undiscounted-price')
              .then((undiscountedPrice) => {
                const undiscountedPriceNum = Number(undiscountedPrice.text().match(/\d+/));
                cy.get('.discounted-price')
                  .then((discountedPrice) => {
                    const discountedPriceNum = Number(discountedPrice.text().match(/\d+/));
                    const calculatedDiscountedPrice = convertPriceToInt(undiscountedPriceNum, discountNum);
                    expect(calculatedDiscountedPrice).to.equal(convertPriceToInt(discountedPriceNum));
                  });
              });
          });
      });
      it('can update the product description', () => {
        cy.adminProductFormFillDescription('new description');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/shop/${product}`);
        cy.contains('new description');
      });
      it('can update the product stock', () => {
        cy.adminProductFormFillStock('4');
        cy.adminSubmitShopProductEditForm();
        cy.visit(`${clientUrl}/shop/${product}`);
        cy.get('.stock')
          .should('contain.text', '4');
      });
      it('can update the product\'s specifications', () => {
        cy.get('.category')
          .eq(2)
          .find('.header-row')
          .find('.edit-button')
          .click()
          .type('An updated category');
        cy.get('.category')
          .eq(3)
          .find('.header-row')
          .then((updatedKeyCategoryName) => {
            cy.get('.category')
              .eq(3)
              .find('.specification')
              .eq(0)
              .find('.span-input-wrapper.key')
              .find('.edit-button')
              .click()
              .type('An updated key');
            cy.get('.category')
              .eq(4)
              .find('.header-row')
              .then((updatedValueCategoryName) => {
                cy.get('.category')
                  .eq(4)
                  .find('.specification')
                  .eq(0)
                  .find('.span-input-wrapper.value')
                  .find('.edit-button')
                  .click()
                  .type('An updated value');
                cy.adminSubmitShopProductEditForm();
                cy.visit(`${clientUrl}/shop/${product}`);
                cy.get('.category')
                  .each((category) => {
                    if (category.find('.header-row').text() === updatedKeyCategoryName.text()) {
                      expect(category).to.contain.text('An updated key');
                    }
                    if (category.find('.header-row').text() === updatedValueCategoryName.text()) {
                      expect(category).to.contain.text('An updated value');
                    }
                  });
              });
          });
      });
    });
  });
});
