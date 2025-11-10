import Performance from '../../../../../support/PageObject/Gerenciar/Configuracao/Performance';

describe('Teste Configuração > Performance', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        cy.Navegacao_Configuracao();
    });

    it('[QA-01] - Criacao de proposta', () => {

        let validador = false;
        let count = 3;

        Performance.navegandoPerformance()
        Performance.validaCriacaoProposta();
        //Performance.inserindoProposta()

        // Tipo de tráfego
        cy.get('.el-select__wrapper')
        .should('be.visible')
        .click()

        cy.wait(500)

        cy.xpath('//ul[@class="el-scrollbar__view el-select-dropdown__list"]/li').each(function (opc_trafego, index, lista) {
            cy.wrap(opc_trafego)
                .should('be.visible')
                .click()
                .then(($elemento) => {
                    const text_element = $elemento.text().trim();
                    const descricao = `(Automação) Tipo de tráfego : ${text_element}`;

                    //Inserindo descrição
                    cy.xpath('//*/textarea[@name="description"]')
                    .should('be.visible')
                    .type(descricao);

                    //Btn Adicionar
                    Performance.clickBtnAdicinar()

                    // Modal de validação   
                    Performance.validandoModal()
                    Performance.validandoPerformance(validador,count)
                    Performance.validandoTabela()


                cy.then(() => {
                    validador = true;
                    count += 1;

                    if (index !== lista.length - 1) {
                        cy.validaCriacaoProposta();
                    }
                    else{
                        //cy.screenshot('conclusao_projeto')
                    }
                });
            });
        });
    });
});
