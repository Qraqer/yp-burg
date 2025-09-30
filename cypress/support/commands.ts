/// <reference types="cypress" />

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).trigger('dragstart');
  cy.get(targetSelector).trigger('dragover').trigger('drop', { force: true });
});

Cypress.Commands.add('fillOrder', () => {
  cy.dragAndDrop(
    '[data-testid="ingredient_bun_1"]',
    '[data-testid="drag_and_drop_area"]'
  );
  cy.dragAndDrop(
    '[data-testid="ingredient_main_1"]',
    '[data-testid="drag_and_drop_area"]'
  );
  cy.dragAndDrop(
    '[data-testid="ingredient_sauce_1"]',
    '[data-testid="drag_and_drop_area"]'
  );
});

Cypress.Commands.add('checkModal', (action = 'overlay') => {
  cy.get('[data-testid="modal"]').as('modal');

  cy.get('@modal').should('exist');
  switch (action) {
    case 'overlay':
      cy.get('[data-testid="modal_overlay"]').click('topLeft', {force: true});
      break;
    case 'close':
      cy.get('[data-testid="modal_close"]').click();
      break;
  }
  cy.get('@modal').should('not.exist');
});
