import EventoGamificacao from '../../../../support/PageObject/Gerenciar/EventoGamificacao';

describe('Teste Gerenciar > Evento Gamificação', () => {


    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login_stage16(usuario.email, usuario.senha);
        });

        EventoGamificacao.navegarEventos()

        cy.wait(2000);

    });

    it('[CASE - 01 ] Validando Inputs e Btns ', () => {

        EventoGamificacao.validacaoheaderEventoGamificacao()

        EventoGamificacao.validandoInputs()

        EventoGamificacao.validandoBtns()

    });

    it('[CASE - 02] Validando Modal Adicionar Evento de Gamificação ', () => {

        EventoGamificacao.clickbtnAdicionar()

        EventoGamificacao.validarModalAdicionarEventos()
    });

    // Opções de datas que o sistema oferece
    const opcoes_horas = ['Saldo Real', 'Saldo Bônus', 'Remoção de Saldo Real', 'Saldo Cashback', 'Freespins', 'Freebets', 'Freechips'];
    //const opcoes_horas = ['Freebets'];


    // Executa o mesmo teste para cada opção
    opcoes_horas.forEach((opcao) => {
        it(`[CASE - 03] inserindo dados no Evento Gamificação: ${opcao}`, () => {

            EventoGamificacao.clickbtnAdicionar()

            EventoGamificacao.selectEventoGamificacao(opcao)

            EventoGamificacao.inserirDados(opcao)

        })
    });

    it.only('[CASE - 04] Ações eventos de gamificação', () => {

        EventoGamificacao.validandoEditar()

        EventoGamificacao.validandoEdicao()

    });

});