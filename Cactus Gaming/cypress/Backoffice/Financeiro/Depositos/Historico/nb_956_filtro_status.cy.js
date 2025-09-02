import Historico from '../../../../../pages/Backoffice/Financeiro/Depositos/Historico';

describe('Teste Depositos > Historico',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);
        })
    })

    const opc_status = ['Aprovado','Negado','Pendente','Todos'];

    opc_status.forEach((opc) => {
        it(`Testando filtro para status: ${opc}`, () => {

            cy.Navegacao_Deposito();

            //Navegando para historico
            Historico.navegandoHistorico()

            cy.Selecionando_1_ano_filtro()

            // Selecionando Status
            Historico.selecionandoStatus(opc)

            // Validando select
            Historico.validarSelect(opc)

            // Filtrando
            //cy.get('.mt-9 > .btn').click();

            // validar se a tabela ta vazia 
            //Historico.validaTabelaStatus(opc)
        })  
    })
})