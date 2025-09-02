import Historico from '../../../../../pages/Backoffice/Financeiro/Depositos/Historico';

describe('Teste Depositos > Historico', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    const opc_pesquisa = ['Todos', 'Id do Jogador', 'Valor', 'Nome do jogador'];

    const filtro = 'Todos'

    opc_pesquisa.forEach((opc) => {
        it(`Testando filtro por: ${opc}`, () => {

            cy.Navegacao_Deposito();

            //Navegando para historico
            Historico.navegandoHistorico()

            cy.Selecionando_1_ano_filtro()

            // Selecionando Status
            Historico.selecionandoStatus(filtro)

            cy.wait(500);

            // Filtrando
            if (opc == "Todos") {
                cy.get('.mt-9 > .btn').click();

            // Selecioanando outros inputs
            } else {

                Historico.selecionandoOutrosFiltros(opc)

                //cy.get('body').then(($body) => {
                //    if ($body.find('.dataTables_empty > .border-0').length > 0) {
                //        cy.log('A tabela está vazia');
                //        cy.get('.dataTables_empty > .border-0')
                //            .should('contain', 'Nenhum dado encontrado');
                //    } else {
                //        cy.log('A tabela possui dados');

                //        cy.xpath('//*[@id="kt_app_content_container"]/div/div[2]/div/div[1]/table/tbody/tr[1]/td/div')
                //            .each(($cell, index) => {
                //                const texto = $cell.text();
                //               dados_tabela.push(texto);
                //                cy.log(`Coluna ${index + 1}: ${texto}`);
                //            })
                //            .then(() => {
                //                if (opc === 'Todos') {
                //                    expect(dados_tabela[5]).to.contain('Aprovado');
                //                }
                //            });
                //    }
                //});

            }
        });
    });
});