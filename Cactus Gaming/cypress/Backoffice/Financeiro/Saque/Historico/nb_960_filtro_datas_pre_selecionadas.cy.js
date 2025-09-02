import SaqueHistorico from '../../../../../pages/Backoffice/Financeiro/Saque/Historico';

describe('Teste Saque > Historico' , () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido
            cy.login(usuario.email,usuario.senha)
        })
    })

    const opcoes_horas = ['Hoje', 'Ontem', '1 semana', '1 mês', '3 meses', '6 meses', '1 ano'];

    opcoes_horas.forEach((opc) => {
        it(`Testando filtro para: ${opc}`, () => {
            
            cy.Navegacao_Saque();

            // Clickando no historico
            SaqueHistorico.clickSecaoHistorico()

            // Verificando se filtro ta visivel
            SaqueHistorico.selecionarData(opc)

            // Btn filtrar
            SaqueHistorico.validarDatasRetornadas(opc)
        })
    })
})