/// <reference types="cypress" />

describe("My Second Test Suite", function () {
  it("My FirstTest case", function () {
    //Check boxes
    cy.visit(Cypress.env("url") + "/AutomationPractice/");

    cy.get("tr td:nth-child(2)").each(($e1, index, $list) => {
      const text = $e1.text();
      if (text.includes("Python")) {
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next() //can only use this to traverse to sibling with get()
          .then(function (price) {
            const priceText = price.text();
            expect(priceText).to.equal("26");
          });
      }
    });
  });
});
