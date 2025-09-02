import Players from '../../../../../pages/Backoffice/Financeiro/AnaliseRisco/Players';

describe('Teste Analise de risco > Players  ',() => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opcoes_horas = ['1 mês','3 meses','6 meses', '1 ano'];

    opcoes_horas.forEach(($opc) => {
        it(`Testando filtro para: ${$opc}`, () => {
            
            cy.Navegacao_Analise_risco()

            cy.wait(500)

            // Click na seção players balance
            Players.clickBtnPlayersBalance()

            // Verificando se filtro ta visivel
            cy.xpath('//div[@class="position-relative align-items-center"]/div', { timeout: 5000 })
                .eq(1)
                .should('be.visible')
                .click();

            cy.wait(1000)

            cy.get('.el-picker-panel__sidebar')
                .eq(1)
                .should('be.visible')
                .contains($opc)
                .click();

            cy.wait(500)

            cy.xpath('//*[@id="tab_high_balance_players"]//div[2]/button')
                .should('be.visible')
                .click()        
                
            cy.wait(500)

            // Validando data na tabela de data
            Players.validarDatasRetornadas($opc)

        });
    })
})