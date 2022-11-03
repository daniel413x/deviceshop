/* eslint-disable no-undef */
import { clientUrl, serverUrl } from '../../support/commands';

/// <reference types="cypress" />

describe('stonetech app', () => {
  beforeEach(() => {
    cy.request('POST', `${serverUrl}/api/testing/reset`);
    cy.visit(clientUrl);
  });
  describe('as a guest', () => {
    beforeEach(() => {
      cy.get('.slider');
    });
    describe('using the slider', () => {
      beforeEach(() => {
        cy.get('.slider')
          .find('.control-panel')
          .find('.page-numbers')
          .find('.current-page')
          .as('counter');
        cy.get('.slider')
          .find('.control-panel')
          .find('.buttons')
          .find('.arrow-right')
          .as('next');
        cy.get('.slider')
          .find('.control-panel')
          .find('.buttons')
          .find('.arrow-left')
          .as('prev');
        cy.get('.slider')
          .find('.control-panel')
          .find('.scroll-bar-progress')
          .as('scrollBarProgress');
      });
      it('initializes with the first slider image properly indicated in the counter', () => {
        cy.get('@counter')
          .should('contain.text', '1');
      });
      it('scrolls through each image while properly tracking the page number and scroll bar progress and blocking buttons at their page limits', () => {
        cy.wait(2000);
        cy.get('@next')
          .click();
        cy.get('@counter')
          .should('contain.text', '2');
        cy.get('@scrollBarProgress')
          .should('have.class', 'middle');
        cy.wait(2000);
        cy.get('@next')
          .click();
        cy.get('@counter')
          .should('contain.text', '3');
        cy.get('@scrollBarProgress')
          .should('have.class', 'end');
        cy.get('@next')
          .should('have.class', 'blocked');
        cy.wait(2000);
        cy.get('@prev')
          .click();
        cy.get('@counter')
          .should('contain.text', '2');
        cy.get('@scrollBarProgress')
          .should('have.class', 'middle');
        cy.wait(2000);
        cy.get('@prev')
          .click();
        cy.get('@counter')
          .should('contain.text', '1');
        cy.get('@prev')
          .should('have.class', 'blocked');
        cy.get('@scrollBarProgress')
          .should('not.have.css', 'middle');
        cy.get('@scrollBarProgress')
          .should('not.have.css', 'end');
        // .should('contain.text', '1');
      });
      it('blocks the user from scrolling through too fast', () => {
        cy.wait(2000);
        cy.get('@next')
          .click();
        cy.wait(200);
        cy.get('@next')
          .click();
        cy.wait(200);
        cy.get('@next')
          .click();
        cy.get('@counter')
          .should('contain.text', '2');
      });
    });
    describe('on /projects', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/projects`);
      });
      it('fetches and renders projects upon loading', () => {
        cy.get('#projects-ul')
          .find('img')
          .should('have.length', 22);
      });
      it('fetches and renders more projects upon scrolling to the upper edge of the footer', () => {
        cy.get('#projects-ul')
          .find('img');
        cy.scrollLoadProjectsBatchTwo();
        cy.get('#projects-ul')
          .find('img')
          .should('have.length', 44);
      });
      it('fetches and renders up to the maximum number of projects as per pagination', () => {
        cy.get('#projects-ul')
          .find('img');
        cy.scrollLoadProjectsBatchTwo();
        cy.scrollLoadProjectsBatchThree();
        cy.get('#projects-ul')
          .find('img')
          .should('have.length', 52);
      });
      describe('all projects are already fetched', () => {
        beforeEach(() => {
          cy.scrollLoadProjectsBatchTwo();
          cy.scrollLoadProjectsBatchThree();
        });
        it.only('does not wipe fetched projects upon switching pages via NavLinks', () => {
          cy.contains('Main')
            .click({ force: true });
          cy.contains('Projects')
            .click({ force: true });
          cy.get('#projects-ul')
            .find('img')
            .should('have.length', 52);
        });
      });
    });
  });
});
