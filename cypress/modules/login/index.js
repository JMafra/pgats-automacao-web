import { faker } from '@faker-js/faker';

class Login{
  preencherFormularioDePreCadastro() {
    const timestamp = new Date().getTime()    
        
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()       
        
    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
    cy.get('[data-qa="signup-email"]').type(`test-${timestamp}@gmail.com`)
    cy.contains('button','Signup').click()
  }
}

export default new Login()
