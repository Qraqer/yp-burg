import type {} from '../support/cypress';

/// <reference types="cypress" />

describe('Проверка работы основных действий в приложении', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="submit_order_button"]').as('submitOrderButton');
  });

  it('Добавляем ингредиенты в заказ', () => {
    cy.fillOrder();
  });

  it('При создании заказа неавторизованный пользователь попадает на страницу логина', () => {
    cy.fillOrder();
    cy.get('@submitOrderButton').click();
    cy.url().should('include', '/login');
  })

  it('Авторизованный пользователь создает заказ с показом модального окна заказа', () => {
    cy.visit('/login');
    cy.get('[data-testid="email_login_input"]').type('qraq@suprnode.ru');
    cy.get('[data-testid="password_login_input"]').type('123456');
    cy.get('[data-testid="login_submit_button"]').click();
    cy.fillOrder();
    cy.get('@submitOrderButton').click();
    cy.checkModal('overlay');
  })

  it('Просмотр заказа в общей ленте заказов', () => {
    cy.visit('/feed');
    cy.get('[data-testid="order_card_0"]').click();
    cy.checkModal('close');
  })

  it('Просмотр ингредиента в модальном окне', () => {
    let itemTitle: string;
    const ingredientIndex = 2;

    cy.get(`[data-testid="ingredient_main_${ ingredientIndex }_title"]`).then(
      $text => {
        itemTitle = $text.text();
      }
    );

    cy.get(`[data-testid="ingredient_main_${ ingredientIndex }"]`).click();
    cy.get('[data-testid="ingredient_details_title"]').should(
      $name => {
        const detailTitle = $name.text();
        
        expect(detailTitle).to.equal(itemTitle);
      }
    );
  })
});
