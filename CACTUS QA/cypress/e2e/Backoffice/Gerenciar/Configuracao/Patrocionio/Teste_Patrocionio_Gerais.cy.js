import Patrocinio from '../../../../../support/PageObject/Gerenciar/Configuracao/Patrocinio';
describe('Teste Patrocionio > Geral', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        cy.Navegacao_Configuracao();
        
    });

    it('[CASE 01] - Adicionando Patrocionio', () => {
        Patrocinio.navegarPatrocinio()

        // Clickando no btn adicionar - Validando Modal
        Patrocinio.validandoBtnAdicionarPatrocinio()

        Patrocinio.inserindoDadosPatrocinio()
    });

    it('[CASE 02] - Validando patrocinio criado na tabela ',() => {
        Patrocinio.navegarPatrocinio()

        Patrocinio.validandoFiltro()

        Patrocinio.validandoBtnFiltrar()

        Patrocinio.validandoTabela()
    });

    it('[CASE 03] - Validando acoes de patrocinio - Editar',() => {
        Patrocinio.navegarPatrocinio()

        Patrocinio.validandoFiltro()

        Patrocinio.validandoBtnFiltrar()

        Patrocinio.validandoAcoesEditar()
    });

    it('[CASE 04] - Validando acoes de patrocinio - Torna Principal',() => {
        Patrocinio.navegarPatrocinio()

        Patrocinio.validandoFiltro()

        Patrocinio.validandoBtnFiltrar()

        //Patrocinio.validandoAcoesPrincipal()

        Patrocinio.validandoAcao()
    });

    it.only('[CASE 05] - Validando acoes de patrocinio - Excluir',() => {
        Patrocinio.navegarPatrocinio()

        Patrocinio.validandoFiltro()

        Patrocinio.validandoBtnFiltrar()

        Patrocinio.validandoAcaoDeletar()
    });
})