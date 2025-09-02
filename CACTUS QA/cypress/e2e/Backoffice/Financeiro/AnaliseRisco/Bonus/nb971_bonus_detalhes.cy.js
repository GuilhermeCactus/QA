import Bonus from '../../../../../pages/Backoffice/Financeiro/AnaliseRisco/Bonus';

describe('Teste - Filtro de Data | Análise de Risco', () => {
    // Executa antes de cada teste
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    // Opções de datas que o sistema oferece
    const opcoes_horas = ['1 mês', '3 meses', '6 meses', '1 ano'];

    // Executa o mesmo teste para cada opção
    opcoes_horas.forEach((opcao) => {
        it(`Valida filtro de data para: ${opcao}`, () => {
            
            // Navega até a tela de análise de risco
            cy.Navegacao_Analise_risco();

            // Abre o seletor de data
            Bonus.selecionarData(opcao)

            // Clica no botão de "Buscar" ou "Filtrar"
            Bonus.clickBtnFiltrar();

            // Abre os detalhes do primeiro item retornado
            Bonus.clickBtnDetalhes();

            // Validar modal de detalhes
            Bonus.validarModalDetalhes()

            // Fecha modal de detalhes
            Bonus.fecharModalDetalhes()

            // Captura os valores exibidos nos inputs do filtro de data
            Bonus.validarDatasRetornadas(opcao)
        });
    });
});
