import SaqueHistorico from '../../../../../pages/Backoffice/Financeiro/Saque/Historico';

describe('Teste Saque > Historico' , () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido
            cy.login(usuario.email,usuario.senha)
        })
    })

    const opcoes_status = ['Todos','Aprovado','Negado','Pendente'];

    opcoes_status.forEach((opc) => {
        it(`Testando filtro para: ${opc}`, () => {
            
            cy.Navegacao_Saque();

            // Clickando no historico
            SaqueHistorico.clickSecaoHistorico()

            cy.Selecionando_1_ano_filtro()

            // Clicando no filtro primario
            SaqueHistorico.selecionaStatus(opc)

            // Filtrando
            SaqueHistorico.clickBtnFiltrar()

            // Validando select
            SaqueHistorico.validandoSelect(opc)

            cy.wait(1500)

            let dados_tabela = []

            // validar se a tabela ta vazia 
            cy.get('body').then(($body) => {

                if ($body.find('.dataTables_empty > .border-0').length > 0) {
                    cy.log('A tabela esta vazia')
                    cy.get('.dataTables_empty > .border-0').then(($el) => {
                        const texto = $el.text().trim();
                        expect(
                            texto === 'Nenhum dado encontrado.' ||
                            texto === "Por favor, clique em 'Filtrar' para carregar os dados.",
                            `Texto inesperado: "${texto}"`
                        ).to.be.true;
                    });
                } else {
                    // Tabela possui dados
                    cy.log('A tabela possui dados');

                    // Captura os dados da tabela
                    for (let i = 1; i <= 7; i++) {
                        cy.xpath(`//*[@id="kt_app_content_container"]/div/div[1]//table/tbody/tr/td[${i}]/div`)
                        .then(($cell) => {
                            const texto = $cell.text();
                            dados_tabela.push(texto);
                            cy.log(`Coluna ${i}: ${texto}`);
                        });
                    }

                    // Validação depois dos dados capturados
                    cy.wait(1000).then(() => {
                        if (opc === 'Todos') {
                            
                        } else if (opc === 'Aprovado'){
                            expect(dados_tabela[6]).to.contain('Aprovado')
                            cy.log('Teste realizado com sucesso !')
                        }
                    });
                }
            })
        })
    })
})