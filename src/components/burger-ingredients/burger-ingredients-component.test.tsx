import { store } from '@/services/store';
import { render, cleanup, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { BurgerIngredients } from './burger-ingredients';

class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

describe('Компонент BurgerConstructor', () => {
  afterEach(() => {
    cleanup();
  });

  it('При рендере будет список табов и место для списка ингредиентов', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
          </DndProvider>
        </Provider>
      </BrowserRouter>
    );

    const tabs = screen.getByTestId('tabs');
    const list = screen.getByTestId('burger_ingredients_list');

    expect(tabs).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });
});
