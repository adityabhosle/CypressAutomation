/// <reference types="cypress" />
describe("My First Suite", function () {
  it("My First Test Case!", function () {
    // steps
    cy.visit(Cypress.env("url") + "/AutomationPractice/");
    cy.get(".search-keyword").type("ca");
    cy.get(".product:visible").should("have.length", 4);
    cy.get(".products").find(".product").should("have.length", 4);
    cy.get(".products").find(".product").eq(2).contains("ADD TO CART").click();

    cy.get(".products")
      .find(".product")
      .each(($e1, index, $list) => {
        const textVeg = $e1.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          cy.wrap($e1).find("button").click();
        }
      });

    cy.get(".brand").then(function (logoText) {
      cy.log(logoText.text());
    });
  });
});
