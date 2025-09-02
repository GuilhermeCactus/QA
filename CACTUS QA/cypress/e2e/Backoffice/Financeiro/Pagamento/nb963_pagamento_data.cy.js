import Pagamento from '../../../../pages/Backoffice/Financeiro/Pagamento';

describe('Teste Pagamento',() => {
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

            cy.Navegacao_Pagamentos();

            // Validando URL
            cy.url().should('contain','payments/History')

            // Selecionando data
            Pagamento.selecionarData(opc)

            // Clica no botão de aplicar filtro
            Pagamento.clickBtnFiltrar();

            // Valida data
            Pagamento.validarDatasRetornadas(opc)
        });
    })    
})