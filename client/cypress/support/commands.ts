/// <reference types="cypress" />

export const clientUrl = 'http://localhost:3000';
export const serverUrl = 'http://localhost:6001';

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

Cypress.Commands.add('scrollLoadProjectsBatchTwo', () => {
  cy.scrollTo('0', '85%');
  cy.wait(200);
  cy.scrollTo('0', '87%');
  cy.wait(200);
  cy.scrollTo('0', '88%');
  cy.wait(200);
  cy.scrollTo('0', '89%');
  cy.wait(200);
  cy.scrollTo('0', '90%');
  cy.wait(200);
});

Cypress.Commands.add('scrollLoadProjectsBatchThree', () => {
  cy.scrollTo('0', '90%');
  cy.wait(200);
  cy.scrollTo('0', '91%');
  cy.wait(200);
  cy.scrollTo('0', '92%');
  cy.wait(200);
  cy.scrollTo('0', '93%');
  cy.wait(200);
  cy.scrollTo('0', '94%');
  cy.wait(200);
});

export {};
