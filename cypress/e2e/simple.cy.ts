import type {} from '../support/cypress';

/// <reference types="cypress" />

describe('Проверка работы основных действий в приложении', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Добавляем ингредиенты в заказ', () => {
    cy.fillOrder();
  });

  it('При создании заказа неавторизованный пользователь попадает на страницу логина', () => {
    cy.fillOrder();
    cy.get('[data-testid="order_button"]').click();
    cy.url().should('include', '/login');
  })

  it('Авторизованный пользователь создает заказ с показом модального окна заказа', () => {
    cy.visit('/login');
    cy.get('[data-testid="email_data_test"]').type('qraq@suprnode.ru');
    cy.get('[data-testid="password_data_test"]').type('123456');
    cy.get('[data-testid="submit_button"]').click();
    cy.fillOrder();
    cy.get('[data-testid="order_button"]').click();
    cy.checkModal('overlay');
  })

  it('Просмотр заказа в общей ленте заказов', () => {
    cy.visit('/feed');
    cy.get('[data-testid="order_card_0"]').click();
    cy.checkModal('close');
  })

  it('Просмотр ингредиента в модальном окне', () => {
    cy.get('[data-testid="ingredient_main_0"]').click();
    cy.checkModal('close');
  })
});
