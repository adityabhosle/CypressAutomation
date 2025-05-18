/// <reference types="cypress" />
describe("Child window - opening in separte window", function () {
  it("Verify child window", function () {
    cy.visit("/AutomationPractice/");
    cy.get("#opentab").then(function (e1) {
      const urlTest = e1.prop("href");
      cy.visit(urlTest); //qaclickacademy.com
      //since cypress does not work cross domain
      cy.origin(urlTest, () => {
        cy.get("div.sub-menu-bar a[href*='about']").click();
      });
    });
  });
});
