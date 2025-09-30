import "./commands";

declare global {
    namespace Cypress {
        interface Chainable {
            dragAndDrop(sourceSelector: string, targetSelector: string): void;
            fillOrder(): void;
            checkModal(action: string): void;
        }
    }
}
