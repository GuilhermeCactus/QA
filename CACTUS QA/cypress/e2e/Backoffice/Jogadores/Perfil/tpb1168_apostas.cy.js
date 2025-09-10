import Perfil from "../../../../support/PageObject/Jogadores/Perfil";

describe('TEST - Jogadores - Perfil',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const opc = ['Depósitos','Saques','Apostas','Cassino','Bônus','Transações','Club Vip'];

    opc.forEach((opcao, index) => {
        it(`Validar - Apostas > ${opcao}`, () => {
            cy.Navegacao_Jogadores_Perfil();

            Perfil.validarURL()

            Perfil.inputBuscaID()

            Perfil.clickBtnBuscar()

            // Validando Usuario
            Perfil.validandoIDTable()

            // Clickando em apostas
            cy.contains('Apostas')
                .should('be.visible')
                .click();

            cy.wait(500);

            // Clicando na opção
            cy.get(`.card-header > .nav > :nth-child(${index + 1}) > .nav-link`)
                .click();

            cy.wait(500);

            // Se for aposta -> Devemos validar o ticket (Modal e btn -> Fechar)
            if (opcao == "Apostas") {
                cy.xpath('//*[@id="tab_bets"]/div/div[1]/table/tbody/tr[1]/td[8]/div/div/button')
                    .click()

                cy.wait(500)

                cy.get('#modal_view_ticket > .modal-dialog > .modal-content ')
                    .should('be.visible')

                cy.wait(500)

                cy.xpath('//*[@id="modal_view_ticket_header"]/div/span')
                    .eq(0)
                    .click()
            }
            cy.get('.col-lg-8 > .card > :nth-child(2)')
                .should('be.visible');
        });
    });
})
