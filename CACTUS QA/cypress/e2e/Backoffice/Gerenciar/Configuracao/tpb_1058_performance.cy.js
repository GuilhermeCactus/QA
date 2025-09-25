describe('Teste Configuração > Performance', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });
    });

    it('Fluxo certo', () => {

        cy.Navegacao_Configuracao();
        
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath('//span[text()="Performance"]/parent::a')
        .scrollIntoView()
        .should('be.visible')
        .click();

        // Verifica a URL
        cy.url().should('include', 'settings/Performance');

        cy.screenshot('navegacao_performance')

        cy.get('.card-body')
            .should('be.visible')

        cy.Criando_Performance();

        let validador = false;
        let count = 3;

        cy.xpath('//ul[@class="el-scrollbar__view el-select-dropdown__list"]/li').each(function (opc_trafego, index, lista) {
            cy.wrap(opc_trafego)
                .should('be.visible')
                .click()
                .then(($elemento) => {
                    const text_element = $elemento.text().trim();
                    const descricao = `(Automação) Tipo de tráfego : ${text_element}`;

                    cy.xpath('//*/textarea[@name="description"]')
                        .should('be.visible')
                        .type(descricao);

                    cy.get('.modal-footer > .btn-primary').click();

                    cy.get('.swal2-popup').should('be.visible');

                    cy.xpath('//*[@id="swal2-html-container"]')
                        .invoke('text')
                        .then((text_card) => {
                            expect(text_card).to.include('Tem certeza que deseja enviar?');

                            cy.screenshot('deseja_enviar')

                            cy.wait(500);
                            cy.xpath('//*[@id="kt_app_body"]//div[@class="swal2-actions"]/button[3]').click();

                            if (validador) {
                                cy.wait(500);
                                cy.xpath('//*[@id="swal2-html-container"]')
                                    .invoke('text')
                                    .then((text_card) => {
                                        expect(text_card).to.include('Já existe um registro ativo com os dados informados!');
                                    });

                                cy.wait(500);
                                cy.screenshot('ja_existe_registro')
                                cy.get('.swal2-confirm').click();

                                cy.get('.el-date-editor').should('be.visible').click();
                                cy.get(`.el-picker-panel__sidebar > :nth-child(${count})`).click();
                                cy.wait(500);
                                cy.get('.modal-footer > .btn-primary').click();
                                cy.wait(1500);
                                cy.get('.swal2-confirm').click();
                            }

                            const dados_tabela = [];
                            const dataAtual = new Date();
                            const data_formatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

                            cy.wait(3000);

                            cy.xpath('//*[@id="kt_app_content_container"]//div[2]//div[1]/table/tbody/tr').each(($linha) => {
                                const linha_dados = [];

                                cy.wrap($linha).find('td').each(($celula) => {
                                    const texto = $celula.text().trim();
                                    linha_dados.push(texto);
                                }).then(() => {
                                    dados_tabela.push(linha_dados);
                                });
                            }).then(() => {
                                dados_tabela.forEach((dado_linha) => {
                                    if (dado_linha[1] === descricao) {
                                            cy.log(`Processo criado com sucesso! -> ${dado_linha[1]}`);
                                        }
                                });
                                cy.wait(1000);
                            });
                        });

                cy.then(() => {
                    validador = true;
                    count += 1;

                    if (index !== lista.length - 1) {
                        cy.Criando_Performance();
                    }
                    else{
                        cy.screenshot('conclusao_projeto')
                    }
                });
            });
        });
    });
});
