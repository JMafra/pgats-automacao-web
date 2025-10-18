/// <reference types="cypress" />
import {
    getRandomNumber,
    getRandomEmail 
} from '../support/helpers';

import { faker } from '@faker-js/faker';

import  menu  from '../modules/menu';
import login  from '../modules/login';
import cadastro  from '../modules/cadastro';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin()      
     });

    it('Exemplos de Logs', () => {
       cy.log('STEP 1: PGTAS AUTOMACAO WEB CY LOG')
       cy.log('STEP 2: PGTAS AUTOMACAO WEB CY LOG')

       cy.log(`getRandomNumber: ${getRandomNumber()}`)
       cy.log(`getRandomEmail: ${getRandomEmail()}`)

       cy.log(`Faker: ${faker.internet.email()}`) 
       cy.log(`Faker: ${faker.person.fullName()}`)

    });

    it.only('Cadastrar um usuário', () => {        
        login.preencherFormularioDePreCadastro()        
        cadastro.preencherFormularioDePreCadastroComplento()
        
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