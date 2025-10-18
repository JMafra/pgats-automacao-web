import modalPage from '../support/pageObjects/modalPage';


// modal.spec.js
describe('Transaction Modal Tests', () => {

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/');
    });

    it('Verify that the modal opens when the user initiates a transaction', () => {
        modalPage.openModal();
        modalPage.modal.should('be.visible');
    });

    it('Ensure that the form can be submitted with valid data in all fields', () => {
        modalPage.openModal();
        modalPage.fillForm('Test Transaction', '100.00', '2023-10-01');
        modalPage.submitForm();
        modalPage.verifyTransactionInTable('Test Transaction', '100,00');
        // Add assertion to verify the transaction was added (e.g., check for success message or updated balance)
     //   cy.get('.success-message').should('contain', 'Transação adicionada com sucesso');

    });

    it('Attempt to submit the form with an empty description field and verify that an appropriate error message is displayed', () => {
        modalPage.openModal();
        modalPage.fillForm('', '100.00', '2023-10-01');
        modalPage.submitForm();
        modalPage.verifyErrorMessage('Por favor, preencha todos os campos');
    });
});
