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
            cy.login_stage16(usuario.email, usuario.senha);
        });
    });

    it(`Teste seção Saque`, () => {

        // Navegação para configuração
        cy.Navegacao_Configuracao();

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        Configuracao.navegaProvedorPagamento()

        Configuracao.clickaSecaoSaque()

        Configuracao.validaCheckStatus('Saques')

    });

    it.only(`Teste seção Depositos`, () => {

        // Navegação para configuração
        cy.Navegacao_Configuracao();

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        Configuracao.navegaProvedorPagamento()

        Configuracao.clickaSecaoDeposito()

        Configuracao.validaCheckStatus('Depositos')

    });
});