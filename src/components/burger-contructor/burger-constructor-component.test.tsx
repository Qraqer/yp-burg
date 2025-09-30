import { store } from '@/services/store';
import { render, cleanup, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import { BurgerConstructor } from './burger-constructor';
import '@testing-library/jest-dom';

describe('Компонент BurgerConstructor', () => {
  afterEach(() => {
    cleanup();
  });

  it('При рендере будет место для переноса ингредиентов, надпись, и кнопка оформления заказа с атрибутом disabled', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <BurgerConstructor />
          </DndProvider>
        </Provider>
      </BrowserRouter>
    );

    const dragZone = screen.getByTestId('drag_and_drop_area');
    const ingredientsPlace = screen.getByTestId('ingredients_place');
    const button = screen.getByTestId('order_button');

    expect(dragZone).toBeInTheDocument();
    expect(ingredientsPlace).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });
});
