import Links from '../../../../../support/PageObject/Gerenciar/Configuracao/Links';

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
        Links.navegarLinks();

        Links.validandoHeaderLinks();

        Links.validandoAdicionarLink();

        Links.validandoInserirLink();
    });

    it(`[CASE - 02] Edição`, () => {

        // Navegação para configuração
        Links.navegarLinks();   

        cy.wait(2000);

        cy.get(':nth-child(2) > .px-2')
            .should('be.visible')
            .then(($td) => {
                const textoAtual = $td.text().trim();
                expect(textoAtual).to.equal('Link do blog');
            });

        cy.get(':nth-child(3) > .px-2 > span')
            .should('be.visible')
            .then(($td) => {
                const textoAtual = $td.text().trim();
                expect(textoAtual).to.equal('https://www.exemplo.com')
            });

    });

    it(`[CASE - 03] Exclusao`, () => {

        // Navegação para configuração
        Links.navegarLinks();   

        cy.wait(2000);

        cy.get('.btn-light-danger')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Tem certeza que deseja excluir?');

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();
    });
});