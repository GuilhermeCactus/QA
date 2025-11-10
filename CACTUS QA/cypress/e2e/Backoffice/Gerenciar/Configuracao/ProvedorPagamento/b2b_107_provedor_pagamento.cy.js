import ProvedorPagamento from '../../../../../support/PageObject/Gerenciar/Configuracao/ProvedorPagamento';

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora erros relacionados a 'setting checked'
    if (err.message.includes("setting 'checked'")) {
        return false;
    }
});

describe('Teste Gerenciar > Configuração', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login_stage16(usuario.email, usuario.senha);
        });
    });

    it(`[CASE - 01] Teste seção Saque`, () => {

        ProvedorPagamento.navegaProvedorPagamento()

        ProvedorPagamento.clickaSecaoSaque()

        ProvedorPagamento.validaCheckStatus()

    });

    it(`[CASE - 02] Teste seção Depositos`, () => {

        ProvedorPagamento.navegaProvedorPagamento()

        ProvedorPagamento.clickaSecaoDeposito()

        ProvedorPagamento.validaCheckStatus()

    });
});