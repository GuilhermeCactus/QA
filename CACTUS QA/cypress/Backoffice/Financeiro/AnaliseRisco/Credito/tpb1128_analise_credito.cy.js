import Credito from '../../../../../pages/Backoffice/Financeiro/AnaliseRisco/Credito';

describe('Teste Analise Risco > Analise de credito' , () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido
            cy.login(usuario.email,usuario.senha)
        })
    })

    it('Fluxo Sucesso', () => {
        
        cy.Navegacao_Analise_risco()

        // Seção "Analise de credito"
        Credito.clickBtnAnaliseCredito();

        // Settando primeiro select
        Credito.settandoSelect(1)

        // Settando Segundo Select
        Credito.settandoSelect(2)

        // Insert valor
        Credito.inserindoInputValor()

        //Settando Terceiro select
        Credito.settandoSelect(3)

        cy.Selecionando_1_ano_filtro(5)

        cy.wait(500)

        Credito.clickBtnFiltrar()

        //Validação tabela
        Credito.validarTabela()

    });

})