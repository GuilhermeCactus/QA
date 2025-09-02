import Configuracao from '../../../../pages/Backoffice/Gerenciar/Configuracao';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros relacionados a 'setting checked'
  if (err.message.includes("setting 'checked'")) {
    return false;
  }
});

describe('Teste Gerenciar > Configuração', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it(`Teste seção Saque`, () => {

        // Navegação para configuração
        cy.Navegacao_Configuracao();

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        Configuracao.navegaParametro()

        Configuracao.clickBtnAdicionar()

        cy.wait(3000)

        // -- > Informações Basicas

        cy.get('#settings_basic_infos > .card-body > :nth-child(1)  .form-control')
            .should('be.visible')
            .type('Teste QA Automatizado')

        cy.wait(500)

        cy.get('#settings_basic_infos > .card-body > :nth-child(2) .form-control')
            .should('be.visible')
            .type('admin@gmail.com')

        cy.wait(500)

        // -- > Seção depositos
        cy.get('#allowDeposit')
            .should('be.visible')
            .click()
            .should('be.checked')

        cy.wait(500)

        cy.get(':nth-child(2) > .col-lg-9 > [aria-label="Mínimo depósito"] > .form-control')
            .should('be.visible')
            .type(1)

        cy.wait(500)

        cy.get('[name="max_deposit_value"] > .form-control')
            .should('be.visible')
            .type(10000)

        cy.wait(500)

        // --> Bonus de deposito
        cy.get('#settings_deposits_bonus > .card-body > :nth-child(1) > .col-lg-9 > :nth-child(1) > .d-flex > .form-check > #allowBonus')
            .should('be.visible')
            .click()
            .should('be.checked')

        cy.wait(500)

        cy.get(':nth-child(2) > .col-lg-9 > .input-group > .form-control')
            .should('be.visible')
            .type(10)

        cy.wait(500)

        cy.get('[name="max_deposit_bonus"] > .form-control')
            .should('be.visible')
            .type(10000)

        cy.wait(500)

        cy.get('#settings_deposits_bonus > .card-body > .mb-7 > .col-lg-9 > .form-control')
            .type('Texto mensagem de deposito - Teste Automatizado !')

        // -> Bonus indicação

        cy.get('#settings_bonus > .card-body > :nth-child(1) > .col-lg-9 > :nth-child(1) > .d-flex > .form-check > #allowBonus')
            .should('be.visible')
            .click()
            .should('be.checked')

        cy.wait(500)
    
        cy.get('[name="min_deposit_amount_to_get_ref_bonus"] > .form-control')
            .should('be.visible')
            .type(10000)

        cy.wait(500)

        cy.get('[name="referral_bonus_amount"] > .form-control')
            .should('be.visible')
            .type(10)


        // -> Bonus depositado

        cy.get('#auto_withdraw_is_active')
            .should('be.visible')
            .should('not.be.checked')
            .click()

        cy.wait(500)

        cy.get('#auto_withdraw_is_active')
            .should('be.visible')
            .should('be.checked')
            .click()

        Configuracao.inputVlrMinSq()

        Configuracao.inputVlrMaxSq()

        Configuracao.inputVlrMaxTotalDiario()

        Configuracao.inputVlrMaxTotalSemana()

        Configuracao.inputVlrMaxTotalMensal()

        Configuracao.inputIntervaloSaque()

        Configuracao.inputIntevalo()

        // ----- Validando dados inseridos

        cy.xpath('//*[@id="settings_withdraws"]//div[12]/span')
            .should('be.visible')
            .invoke('text')
            .then((text_validacao) => {
                cy.log(text_validacao)
            })
    
        // ----- Roll over , está obrigatorio
        // - Tempo expiração cassino
        cy.get('#settings_rollover > .card-body > :nth-child(4) .form-control')
            .should('be.visible')
            .type(24)

        cy.wait(500)

        // - Tempo expiração esporte
        cy.get(':nth-child(5) > .col-lg-9 > .form-control')
            .should('be.visible')
            .type(24)

        cy.wait(500)

        // - Texto rodapé
        cy.get('.ql-editor')
            .should('be.visible')
            .type('Texto teste automatizado')

        cy.wait(500)

        // ----- SEO 
        cy.xpath('//*[@id="settings_regulament"]/div/div/div[1]/input')
            .should('be.visible')
            .type('TesteQA')

        cy.wait(500)

        // - Texto tag H1
        cy.xpath('//*[@id="settings_regulament"]/div/div/div[2]/div/input')
            .should('be.visible')
            .type('QA TEST')

        cy.wait(500)

        cy.xpath('//*[@id="settings_regulament"]/div/div/div[3]/div/textarea')
            .should('be.visible')
            .type('Descrição teste automatizado!')


        cy.contains('Salvar').should('be.visible').click()

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {

                expect(text).contain('Tem certeza que deseja salvar?')

                cy.get('.swal2-confirm')
                    .should('be.visible')
                    .click()

            })

    });
});