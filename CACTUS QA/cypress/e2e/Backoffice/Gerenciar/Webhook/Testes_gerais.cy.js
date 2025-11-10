import Webhook from '../../../../support/PageObject/Gerenciar/Webhook';

describe('Teste Gerenciar > Configuração', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it(`[CASE - 01] Criacao`, () => {

        // Navegação para configuração
        Webhook.navegarWebhook();

        Webhook.validacaoheaderWebhook();

        Webhook.clickbtnAdicionar()

        Webhook.validarModalAdicionarWebhook();

        // Inserindo Metodo GET
        Webhook.inserindoMetodoGET();

        // Inserindo Delay
        Webhook.inserindoDelay('1');

        // Inserindo URL
        Webhook.inserindoURL('https://www.exemplo.com');

        // Selecionando Evento
        Webhook.selecionandoEvento();

        Webhook.clicarBtnSalvar();

        Webhook.validacaoSucessoCriacao();

        // Confirmar
        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

    });

    it(`[CASE - 02] Validacao`, () => {

        Webhook.navegarWebhook();

        Webhook.validacaoheaderWebhook();

        Webhook.validandoElementosFiltro();

        Webhook.validandoRetornoTabela();

    });

    it(`[CASE - 03] Acoes`, () => {
        // Navegação para configuração
        Webhook.navegarWebhook();

        Webhook.validacaoheaderWebhook();

        Webhook.validandoEnviarWebhook();

        Webhook.validandoEditarWebhook();

        Webhook.validandoExcluirWebhook();

    });
});