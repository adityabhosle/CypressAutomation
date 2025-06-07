/// <reference types = "cypress"/>

describe("JWT Tokens and Logins", () => {
  it("Verify login with local storage token", () => {
    cy.loginAPI.then(() => {
      cy.visit(Cypress.env("url") + "/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem(Cypress.env("token"));
        },
      });
    });
  });
});
