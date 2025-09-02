import Historico from '../../../../../pages/Backoffice/Financeiro/Depositos/Historico';

describe('Teste Depositos pendentes',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opcoes_horas = ['Hoje', 'Ontem', '1 semana', '1 mês', '3 meses', '6 meses', '1 ano'];

    opcoes_horas.forEach((opc) => {

        it(`Testando filtro para: ${opc}`, () => {
            cy.Navegacao_Deposito();

            //Navegando para historico
            Historico.navegandoHistorico()

            // Verificando se filtro ta visivel
            Historico.selecionandoData(opc)

            // Validando data na tabela de data
            Historico.validarDatas(opc)
        })
    })
})