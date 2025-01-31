describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
  });
  it("should book an interview", () => {
    cy.contains("li", "Tuesday").click();

    cy.get('[alt="Add"]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get('[alt="Sylvia Palmer"]')
      .click();

    cy.contains('Save')
      .click();

    cy.contains('Saving').should('exist');
    cy.contains('Saving').should('not.exist');

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']").click({ force:true });

    cy.get('input').clear().type('Max Mustermann');

    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains('Save').click();

    cy.contains("Saving").should("exist");
    cy.contains("Saving").should("not.exist");

    cy.contains('.appointment__card--show', "Max Mustermann");

    cy.contains('.appointment__card--show', 'Tori Malcolm');  
  });

  it("should delete an interview", () => {

    cy.get("[alt='Delete']").click({ force: true });

    cy.contains('Confirm').click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});