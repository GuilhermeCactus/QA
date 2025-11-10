import Blacklist from '../../../../support/PageObject/Gerenciar/Blacklist';

describe('Teste Gerenciar > Cupon', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        Blacklist.navegarBlacklist()

        cy.wait(2000);
    });

    it(`[CASE - 01] Criacao`, () => {

        Blacklist.validandoFuncaoAdicionar();

        Blacklist.validandoInserirCPF();

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text', 'Cadastrado com sucesso......');

    });

    it(`[CASE - 02] Validacao`, () => {

        cy.xpath('//*[@id="kt_app_content_container"]/div/div/div[1]/div/div[1]/div/div[1]/div/label')
            .should('be.visible')
            .and('contain.text', 'CPF');

        cy.wait(500);

        Blacklist.validandoCPFtabela();
    });

    it(`[CASE - 03] Acoes -> Excluir`, () => {

        Blacklist.validandoAcoes();

    });

});