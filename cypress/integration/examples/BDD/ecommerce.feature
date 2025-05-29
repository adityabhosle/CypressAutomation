Feature: Ecommerce End To End Testing

    Scenario: Submit Order
    Given I am on eCom site
    When I login into my eCom account
    And I add items to cart and checkout
    And Validate total price limit
    And Select the country 
    Then Hit Submit and verify message