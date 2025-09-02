import RelatorioGGR from '../../../../../pages/Backoffice/Financeiro/CaixaEsporte/RelatorioGGR';

describe('Testando Relatorio GGR',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);
        })

    })

    const opc_status = ['Todos','Aberto','Fechado'];

    opc_status.forEach((opc) => {
        it(`Teste Filtro status : ${opc}`, () => {
            
            cy.Navegacao_Caixa_Esporte();
        
            RelatorioGGR.clickSelecaoRelatorioGGR()

            // Selecionando 1 ano no filtro data
            RelatorioGGR.selecionaData('1 ano')

            // Seleciona coluna Filtro status
            RelatorioGGR.selecionaFiltroStatus(opc)

            RelatorioGGR.validarSelect(opc)
            
            // Botão filtrar
            RelatorioGGR.clickBtnFiltrar()

            cy.wait(1500)

            // Verificando se o elemento existe
            //cy.get('body').then(($body) => {
            //    if ($body.find('.border-0').length) {
                    // Caso o elemento exista, verifica o conteúdo
            //        cy.get('.border-0')
            //            .should('be.visible')
            //            .should('contain', 'Nenhum dado encontrado')
            //    } else {
                    // Caso o elemento não exista, registra uma mensagem no log
            //        cy.log('Elemento .border-0 não encontrado.')
            //    }
            //})
        });
    })


})