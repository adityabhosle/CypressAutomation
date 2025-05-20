/// <reference types="cypress" />
describe("Building E2E Framework", function () {
  before(function () {
    cy.fixture("example.json").then(function (data) {
      this.data = data;
    });
    cy.visit("/loginpagePractise/#");
  });

  it("verify Submit Order", function () {
    const productName = this.data.product;
    cy.get("#username").type(this.data.username);
    cy.get("#password").type(this.data.password);
    cy.contains("Sign In").click();
    cy.contains("Shop Name").should("be.visible");
    cy.get("app-card").should("have.length", 4);
    cy.get("app-card")
      .filter(`:contains("${productName}")`)
      .then(($el) => {
        cy.wrap($el).should("have.length", 1);
        cy.wrap($el).contains("button", "Add").click();
      });
    cy.get("app-card").eq(0).contains("button", "Add").click();
    cy.contains("a", "Checkout").click();

    let sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($el) => {
        const amount = Number($el.text().split(" ")[1].trim());
        sum = sum + amount;
      })
      .then(() => {
        expect(sum).to.be.lessThan(200000); // since the above steps are not cypress commands hence asynchronous willnot be corrected and this tatement would be executed any time.
      });
    cy.contains("button", "Checkout").click();
    cy.get("#country").type("India");
    cy.wait(2000);
    cy.get(".suggestions ul li a").click();
    cy.get(".btn-success").click();
    cy.get(".alert-success").should("contain", "Success");
  });
});
