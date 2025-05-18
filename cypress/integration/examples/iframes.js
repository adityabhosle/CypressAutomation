/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

import "cypress-iframe";

describe("IFrames Suite", function () {
  it("Verify iframe", function () {
    cy.visit("/AutomationPractice/");

    cy.frameLoaded("#courses-iframe"); // load the frame you want to work on first
    cy.iframe().find("a[href*=mentorship").eq(0).click();
    cy.iframe().find("h1[class*=pricing-title]").should("have.length", 2);
  });
});
