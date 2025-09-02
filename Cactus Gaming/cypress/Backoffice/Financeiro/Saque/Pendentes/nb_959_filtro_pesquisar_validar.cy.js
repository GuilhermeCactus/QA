import SaquePendentes from '../../../../../pages/Backoffice/Financeiro/Saque/Pendentes';

describe('Teste Saques validar ',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opc_pesquisar = ['ID','Nome'];

    opc_pesquisar.forEach((opc) => {

        it(`Filtro de "Pesquisar Por." : ${opc}`, () => {

            cy.Navegacao_Saque();

            //Navegar até pendentes
            SaquePendentes.navegandoPendentes()

            // Filtro pesquisa por 
            SaquePendentes.selecionaFiltrarPor(opc)

            //Validando Select
            SaquePendentes.validandoSelect(opc)

            // Input 
            cy.xpath('//div[@class="el-input el-input--large"]//input')
                .type('Test')

            // Botão filtrar
            SaquePendentes.clickBtnFiltrar()

            cy.wait(1500)

            // Verificando se o elemento existe
            //cy.get('body').then(($body) => {
            //    if ($body.find('.dataTables_empty > .border-0').length) {
                    // Caso o elemento exista, verifica o conteúdo
            //        cy.get('.dataTables_empty > .border-0')
            //            .should('be.visible')
            //            .should('contain', 'Nenhum dado encontrado')
            //    } else {
                    // Caso o elemento não exista, registra uma mensagem no log
            //        cy.log('Elemento .border-0 não encontrado.')
            //    }
            //})
        })
    })
})