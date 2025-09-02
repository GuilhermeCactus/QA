import Bonus from '../../../../../pages/Backoffice/Financeiro/AnaliseRisco/Bonus';

describe('Teste - Exportação de Relatório | Análise de Risco', () => {
    // Executa antes de cada teste
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    // Lista de opções de filtro a serem testadas
    const opcoes_horas = ['1 mês', '3 meses', '6 meses', '1 ano'];

    opcoes_horas.forEach((opcao) => {
        it(`Valida exportação com filtro: ${opcao}`, () => {
            // Navega para a tela de análise de risco
            cy.Navegacao_Analise_risco();

            // Abre o seletor de data
            Bonus.selecionarData(opcao);

            // Clica no botão "filtro"
            Bonus.clickBtnFiltrar();

            // Validar data filtro
            Bonus.validarDatasRetornadas(opcao);

            // Clica no botão "Exportar"
            Bonus.clickBtnExportar();

            // Validando exportação
            Bonus.confirmandoAlertaRelatorioExportar();

        });
    });
});
