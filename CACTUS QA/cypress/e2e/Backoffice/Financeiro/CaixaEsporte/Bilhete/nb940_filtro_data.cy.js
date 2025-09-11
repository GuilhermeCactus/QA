//import Bilhete from '../../../../../pages/Backoffice/Financeiro/CaixaEsporte/Bilhete';

describe("Dashboard Filtro pré-fixado", () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const opcoes_horas = ['Hoje', 'Ontem', '1 semana', '1 mês', '3 meses', '6 meses', '1 ano'];

    opcoes_horas.forEach((opc) => {
        it(`Testando filtro para: ${opc}`, () => {
            cy.get('.el-date-editor', { timeout: 5000 })
                .should('be.visible')
                .click();

            cy.get('.el-picker-panel__sidebar')
                .should('be.visible')
                .contains(opc)
                .click();

            // Validando tabela
            Bilhete.validarDatas(opc)
        });
    });
});