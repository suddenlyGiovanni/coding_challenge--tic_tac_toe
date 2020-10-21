/* eslint-disable jest/expect-expect */
describe('CRA', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('shows learn link', () => {
    const learReactLink = /Learn React/

    cy.visit('http://localhost:3000')

    cy.getByText(learReactLink)
      .should('be.visible')
      .and('have.text', learReactLink)
  })

  it('allows the user to navigate navigate to Duck feature', () => {
    cy.getByText(/duck/i)
      .click()
      .assertRoute('/duck')

    cy.getByText('Feature: Duck').should('exist')

    cy.getByText('Toggle quaking').should('exist')
  })
})
