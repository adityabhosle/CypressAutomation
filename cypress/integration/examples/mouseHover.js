/// <reference types="cypress" />
describe("Mouse Actions", function () {
  it("Verify mouse hover action", function () {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");
    //show is used under jQuery since cypress
    //does not support mouse hover

    //when jQuery method is applied, it is applied
    //to its immediate child element which is hidden
    //cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Top").click({ force: true }); //if we do not care whether mouse hover is happening and just want to check if user can click
    cy.url().should("include", "top");
  });
});
