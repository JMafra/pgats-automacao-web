// modalPage.js
class ModalPage {

    get modal() {
        return cy.get('.modal');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get amountInput() {
        return cy.get('#amount');
    }

    get dateInput() {
        return cy.get('#date');
    }

    get cancelButton() {
        return cy.get('.button.cancel');
    }

    get saveButton() {
        return cy.get('button').contains('Salvar');
    }

    openModal() {
        // Assuming there is a button to open the modal
       cy.get('#transaction > .button').click();
        // cy.get('button').contains('Iniciar Transação').click();
        this.modal.should('be.visible');
    }

    fillForm(description, amount, date) {
         if (description?.length > 0) cy.get('#description').type(description);
     //   this.descriptionInput.type(description);
        this.amountInput.type(amount);
        this.dateInput.type(date);
    }

    submitForm() {
        this.saveButton.click();
    }

    verifyTransactionInTable(description, amount) {
        cy.get('table tbody tr')
            .should('contain', description)
            .and('contain', amount);
    }

    verifyErrorMessage(expectedMessage) {
        // Intercepta o window.alert
        cy.on('window:alert', (text) => {
            expect(text).to.equal(expectedMessage);
        });
       // cy.get('.error-message').should('contain', expectedMessage);
    }
}

export default new ModalPage();