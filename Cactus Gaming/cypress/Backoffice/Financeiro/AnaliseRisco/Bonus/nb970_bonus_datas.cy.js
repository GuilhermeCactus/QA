import Bonus from '../../../../../pages/Backoffice/Financeiro/AnaliseRisco/Bonus';

describe('Teste - Filtro de Data | Análise de Risco', () => {

    // Configuração antes de cada teste
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    // Opções disponíveis no filtro
    const opcoesFiltro = ['Hoje', 'Ontem', '1 semana', '1 mês', '3 meses', '6 meses', '1 ano'];

    opcoesFiltro.forEach((opcaoSelecionada) => {
        it(`Valida o filtro de data: ${opcaoSelecionada}`, () => {

            cy.Navegacao_Analise_risco();

            // Seleciona a data no filtro lateral
            Bonus.selecionarData(opcaoSelecionada);

            // Clica no botão de aplicar filtro
            Bonus.clickBtnFiltrar();

            // Verifica se as datas retornadas no campo de input são válidas
            Bonus.validarDatasRetornadas(opcaoSelecionada);

        });
    });
});