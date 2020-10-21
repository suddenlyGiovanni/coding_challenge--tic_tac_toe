// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Assert that the provided route matches the current one
     * @example
     * cy.assertRoute('route')
     */
    assertRoute(route: string): Chainable<any>
  }
}
