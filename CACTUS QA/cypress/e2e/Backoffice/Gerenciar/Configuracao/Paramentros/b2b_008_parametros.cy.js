import Parametro from '../../../../../support/PageObject/Gerenciar/Configuracao/Parametro';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros relacionados a 'setting checked'
  if (err.message.includes("setting 'checked'")) {
    return false;
  }
});

describe('Teste Gerenciar > Configuração', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        cy.Navegacao_Configuracao();
    });

    it(`Teste seção Saque`, () => {

        Parametro.navegarParametro()

        Parametro.validaURLNavegacao()

        Parametro.clickBtnAdicionar()

        cy.wait(3000)

        // -- > Informações Basicas
        Parametro.inserindoInfoBasica()

        // -- > Seção depositos
        Parametro.inserindoDepositos()

        // --> Bonus de deposito
        Parametro.inserindoBonusDepositos()

        // -> Bonus indicação
        Parametro.inserindoBonusIndicacao()

        // -> Bonus saque
        Parametro.inserindoSaques()

        // -> Roll over 
        Parametro.inserindoRollOver()

        // - Texto rodapé
        Parametro.inserindoRodape()

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