import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',(email,senha) => {

    cy.visit('https://stage19-backoffice.bs2bet.com/')
    cy.wait(1500) // -> Tempo generico para resposta html

    // Fazendo login
    cy.get('[placeholder=E-mail]').type(email)
    cy.get('[placeholder=Senha]').type(senha)
    cy.get('#kt_sign_in_submit').click()

    // Validando
    cy.url({timeout:10000}).should('include', '/Dashboard')
    cy.wait(5000) // -> Tempo generico para resposta html

    cy.get('.card-body')
        .should('be.visible')

    cy.wait(1000)
})

Cypress.Commands.add('login_stage16',(email,senha) => {

    cy.visit('https://stage16-backoffice.bs2bet.com/')
    cy.wait(1500) // -> Tempo generico para resposta html

    // Fazendo login
    cy.get('[placeholder=E-mail]').type(email)
    cy.get('[placeholder=Senha]').type(senha)
    cy.get('#kt_sign_in_submit').click()

    // Validando
    cy.url({timeout:10000}).should('include', '/Dashboard')
    cy.wait(4000) // -> Tempo generico para resposta html

    cy.get('.card-body')
        .should('be.visible')

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Caixa_Esporte',() => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Caixa - Esportes']",{timeout:5000})
        .should('be.visible') 
        .click()

    cy.wait(1000)

})

Cypress.Commands.add('Navegacao_Deposito', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Depósitos']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)

})

Cypress.Commands.add('Navegacao_Saque', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Saques']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)

})

Cypress.Commands.add('Navegacao_Pagamentos', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Pagamentos']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)

})

Cypress.Commands.add('Navegacao_Configuracao', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Configurações']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Jogadores_Perfil', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Perfil']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Jogadores_Analise', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Análise']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})


Cypress.Commands.add('Navegacao_Analise_risco', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Análise de Risco']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Relatorio_jogadores', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Jogadores']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Financeiro', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Financeiro']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})

Cypress.Commands.add('Navegacao_Usuarios', () => {
    // Esperando elemento estar valido para ação
    cy.xpath("//span[@class='menu-title' and text() = 'Usuários']",{timeout:5000}).first()
        .should('be.visible') 
        .click()

    cy.wait(1000)
})


Cypress.Commands.add('Selecionando_1_ano_filtro', ($eq) => {
    if (typeof $eq === 'undefined') {
        // Clicando no filtro de data (sem index)
        cy.xpath('//div[@class="position-relative align-items-center"]/div')
        .should('be.visible')
        .click();

        cy.wait(500)

        cy.contains('1 ano').click()
    } else {
        // Clicando no filtro de data (com index)
        cy.xpath('//div[@class="position-relative align-items-center"]/div')
            .eq($eq)
            .should('be.visible')
            .click();

        cy.wait(750)

        // Clicando no painel lateral para 1 ano
        cy.xpath('//button[@type = "button" and text() = "1 ano"]')
            .eq($eq - 1)
            .should('be.visible')
            .click();
    }
});

Cypress.Commands.add('Criando_Performance',() =>{
        cy.wait(500)

    // Btn para criar nova solicitação
    cy.xpath('//*[@id="kt_app_content_container"]/div/div[1]/button')
        .should('be.visible')
        .click()

    cy.wait(500)

    // Esperando aparecer modal
    cy.get('.modal-body')
        .should('be.visible')

    cy.wait(500)

    // Selecionando 1 anos ------------------------------------
    cy.get('.el-date-editor')
        .click()

    cy.wait(500)

    // Clicandk no painel na lateral para 1 ano
    cy.get('.el-picker-panel__sidebar > :nth-child(7)')
        .click()

    cy.wait(500)

    // Tipo de tráfego
    cy.get('.el-input > .el-input__wrapper')
        .click()

    cy.wait(500)
})

Cypress.Commands.add('clickAlerta', (locator,mensagem) => {

    cy.get(locator).click()

    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal(mensagem)
    })

})