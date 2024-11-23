

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredientsAll.json' });
    cy.intercept("GET", 'api/auth/user', { fixture: "user.json" });
    cy.visit('/');
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'testRefresh');
    });
    cy.setCookie('accessToken', 'testAccess');
    cy.get('[data-cy="ingredientID-643d69a5c3f7b9001cfa093c"]').as('ingredient1');
    cy.get('[data-cy="ingredientID-643d69a5c3f7b9001cfa0941"]').as('ingredient2');
    cy.get('[data-cy="ingredientID-643d69a5c3f7b9001cfa0942"]').as('ingredient3');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  })
  
  it('Оформление заказа', () => {
    cy.intercept("POST", "api/orders", { fixture: "order.json" })

      cy.get('@ingredient1').find('button').should('exist').click();
      cy.get('[data-cy="bunDownContainer"]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy="bunTopContainer"]').contains('Краторная булка N-200i').should('exist');
    
      cy.get('@ingredient2').find('button').should('exist').click();
      cy.get('[data-cy="ingredientItem"]').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('@ingredient3').find('button').should('exist').click();
      cy.get('[data-cy="ingredientItem"]').contains('Соус Spicy-X').should('exist');
      cy.get('[data-cy="order-container"]').contains('Оформить заказ').should('exist').click();
      cy.get('[data-cy="orderID"]').contains("59653").should("exist");
      cy.get('[data-cy="modal-close"]').should('exist').click();
      cy.get('[data-cy="modal-container"]').should('not.exist');
      cy.get('[data-cy="ingredientItem"]').should('not.exist')
      cy.get('[data-cy="bunDownContainer"]').should('not.exist');
      cy.get('[data-cy="bunTopContainer"]').should('not.exist');

  });
  it('Открытие и закрытие на крестик модального окна', () => {
    cy.get('@ingredient1').should('exist').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('[data-cy="modal-close"]').should('exist').click();
    cy.get('[data-cy="modal-container"]').should('not.exist');
  });
  it('Открытие и закрытие на оверлей модального окна', () => {
    cy.get('@ingredient1').should('exist').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('[data-cy="overlayModal"]').should('exist').click({force: true});
    cy.get('[data-cy="modal-container"]').should('not.exist');
  })
})
