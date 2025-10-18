/// <reference types="cypress" />
import {
    getRandomNumber,
    getRandomEmail 
} from '../support/helpers';

import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()   
     });

    it('Exemplos de Logs', () => {
       cy.log('STEP 1: PGTAS AUTOMACAO WEB CY LOG')
       cy.log('STEP 2: PGTAS AUTOMACAO WEB CY LOG')

       cy.log(`getRandomNumber: ${getRandomNumber()}`)
       cy.log(`getRandomEmail: ${getRandomEmail()}`)

       cy.log(`Faker: ${faker.internet.email()}`) 
       cy.log(`Faker: ${faker.person.fullName()}`)

    });

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()          
        
        cy.get('[data-qa="signup-name"]').type('QA Tester')

        cy.get('[data-qa="signup-email"]').type(`test-${timestamp}@gmail.com`)

        cy.contains('button','Signup').click()

        cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('12345', {log: false})

        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1992')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())   
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('999999999')

        // Act
        cy.get('[data-qa="create-account"]').click()
        
        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b','Account Created!')

    });

    it('Fazer login com usuário cadastrado', () => {      

       cy.get('[data-qa="login-email"]').type('test-1759530280312@gmail.com')
       cy.get('[data-qa="login-password"]').type('12345')

       cy.get('[data-qa="login-button"]').click()

      cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')  
      cy.get('a[href="/logout"]').should('be.visible')
      
      cy.contains('b', 'QA Tester')
       
    });

    it('Fazer login com email e senha incorretos', () => {
       cy.visit('https://automationexercise.com/')

       cy.get('a[href="/login"]').click()  

       cy.get('[data-qa="login-email"]').type('test-1759530280312@gmail.com')
       cy.get('[data-qa="login-password"]').type('54321')

       cy.get('[data-qa="login-button"]').click()  
      
      cy.contains('p', 'Your email or password is incorrect!')
       
    });

   it('Logout de Usuário', () => {  

       cy.get('[data-qa="login-email"]').type('test-1759530280312@gmail.com')
       cy.get('[data-qa="login-password"]').type('12345')

       cy.get('[data-qa="login-button"]').click()        
       cy.get('i.fa-user').parent().should('contain', 'QA Tester')

       // Act
         cy.get('a[href="/logout"]').should('be.visible').click()

         // Assert
         cy.url().should('includes', 'login')
         cy.contains('Login to your account') 

         cy.get('a[href="/logout"]').should('not.exist')
         cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    });

    it('Enviar um Formulario de Contato com Upload de Arquivo', () => {  
       cy.get('a[href*=contact_us]').click()
      
      
      cy.get('[data-qa="name"]').type('QA Tester')
      cy.get('[data-qa="email"]').type('qatester001@gmail.com')
      cy.get('[data-qa="subject"]').type('Teste de Upload de Arquivo')
      cy.get('[data-qa="message"]').type('Teste de Upload de Arquivo com Cypress')

      cy.fixture('example.json').as('arquivo')
      cy.get('input[type=file]').selectFile('@arquivo')

      cy.get('[data-qa="submit-button"]').click()

      //assert
      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
        
});
});