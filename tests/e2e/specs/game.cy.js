describe('Horse Racing Simulator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('shows empty state on start', () => {
    cy.contains('Horse Racing Simulator').should('be.visible')
    cy.contains('Generate program').should('be.enabled')
  })

  it('generates program after clicking Generate', () => {
    cy.contains('Generate program').click()

    cy.contains('Program').should('be.visible')
    cy.contains('Results').should('be.visible')
    cy.contains('Start').should('be.visible')
  })

  it('starts race when clicking Start', () => {
    cy.contains('Generate program').click()
    cy.contains('Start').click()

    cy.contains('Pause').should('be.visible')

    cy.contains('1st Lap').should('be.visible')
  })

  it('can pause and resume race', () => {
    cy.contains('Generate program').click()
    cy.contains('Start').click()

    cy.contains('Pause').click()
    cy.contains('Resume').should('be.visible')

    cy.contains('Resume').click()
    cy.contains('Pause').should('be.visible')
  })

  it('shows results after first round finished', () => {
    cy.contains('Generate program').click()
    cy.contains('Start').click()

    cy.wait(3000)

    cy.contains('Results').should('be.visible')
    cy.contains('1st Lap').should('exist')
  })
})
