import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../../support/pageObjects/HomePage";
import ConfirmationPage from "../../../../support/pageObjects/ConfirmationPage";

const homePage = new HomePage();
let confirmationPage = new ConfirmationPage();

Given("I am on eCom site", function () {
  cy.visit("/loginpagePractise/");
});

When("I login into my eCom account", function () {
  this.productPage = homePage.login(this.data.username, this.data.password);
  this.productPage.pageValidation();
  this.productPage.getCardCount().should("have.length", 4);
});

When("I add items to cart and checkout", function () {
  this.productPage.selectProduct(this.data.product);
  this.productPage.selectFirstProduct();
  this.cartPage = this.productPage.goToCart();
});

When("Validate total price limit", function () {
  this.cartPage.sumOfProducts().then(function (sum) {
    expect(sum).to.be.lessThan(200000);
  });
});

When("Select the country", function () {
  confirmationPage = this.cartPage.checkoutItems();
});

Then("Hit Submit and verify message", () => {
  confirmationPage.submitFormDetails();
  confirmationPage.getAlertMessage().should("contain", "Success");
});
