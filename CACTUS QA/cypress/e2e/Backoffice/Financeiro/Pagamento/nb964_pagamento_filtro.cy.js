import Pagamento from '../../../../pages/Backoffice/Financeiro/Pagamento';

describe('Teste Pagamentos ',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);
        })
    })

    const opc_status = ['Aprovado','Negado','Todos'];

    opc_status.forEach((opc) => {
        it(`Testando filtro para status: ${opc}`, () => {

            cy.Navegacao_Pagamentos();

            // Validando URL
            cy.url().should('contain','payments/History')

            cy.wait(1000)

            cy.Selecionando_1_ano_filtro()

            // Clicando no filtro primario
            Pagamento.selecionaStatus(opc)

            Pagamento.validarSelect(opc)

            // Filtrando
            Pagamento.clickBtnFiltrar()
        })  
    })
})